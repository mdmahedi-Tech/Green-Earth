
const catchcontainer=document.getElementById('catagery-container');
const treecontainer=document.getElementById('treeContainer');
const loadingSpeener=document.getElementById('loadingspeener');
const alltreesbutton=document.getElementById('alltreesbutton');
const cartContainer= document.getElementById('cartContainer');

const cart=[];

        //    loadcategpry button
 async function loadCategory(){
// async await
const res= await fetch("https://openapi.programming-hero.com/api/categories")

const data=await res.json()
// console.log(data)

data.categories.forEach(category=> {
    // console.log(category)
    const btn=document.createElement("button");
    btn.className="btn btn-outline w-full";
    btn.innerText= category.category_name

   btn.onclick=()=>selectcategorybutton(category.id,btn)
   
      
    catchcontainer.appendChild(btn);
  
});

}
 
async function selectcategorybutton(categoryId,btn){
 console.log(categoryId,btn)
showloading()

const allbuttons=document.querySelectorAll("#catagery-container button,#alltreesbutton");

allbuttons.forEach(button => {
   button.classList.remove("btn-primary")
   button.classList.add("btn-outline")
})
btn.classList.add("btn-primary")
btn.classList.remove("btn-outline")
 const res= await fetch (`https://openapi.programming-hero.com/api/category/${categoryId}`)
 const data=await res.json()
 console.log(data)
displaytrees(data.plants)
 hideloading()

}
// all button active
alltreesbutton.addEventListener("click",()=>{
    const allbuttons=document.querySelectorAll("#catagery-container button,#alltreesbutton");
 
  allbuttons.forEach(button => {
   button.classList.remove("btn-primary")
   button.classList.add("btn-outline")
})
alltreesbutton.classList.add("btn-primary")
alltreesbutton.classList.remove("btn-outline")
 loadtrees()

})

   // tree container load
   function showloading(){
    loadingSpeener.classList.remove("hidden")
    loadingSpeener.classList.add("flex")
   }

   function hideloading(){
  loadingSpeener.classList.add("hidden")
   }

async function loadtrees(){
    showloading()
    const res=await fetch("https://openapi.programming-hero.com/api/plants")
    const data=await res.json()
    // console.log(data);
      hideloading()
     displaytrees(data.plants)
    
} 

// display tress 
function displaytrees(trees){
     treecontainer.innerHTML = ""; 
    // console.log(trees)
    trees.forEach(tree=>{
    // console.log(tree)
    const card=document.createElement('div');
    
    card.className="card bg-base-100 shadow-sm"
    card.innerHTML=`
    
<div class="card bg-base-100 shadow-sm">
        <figure>
            <img
            src="${tree.image}"
            title="${tree.name}"
            class="h-50 w-full"
            />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${tree.name}</h2>
            <p class="line-clamp-2">${tree.description}</p>
            <div class="badge badge-warning">${tree.category}</div>
            <div class="flex justify-between">
                <h2 class="font-bold text-3xl">${tree.price}</h2>
            <button class="btn btn-primary" onclick="addToCart(${tree.id},'${tree.name}',${tree.price})">add card</button>
            </div>
        </div>
        </div>
    
    `
    treecontainer.appendChild(card)
    })
}

// add to cart
function addToCart(id,name,price){
    console.log(id,name,price)
    const existingcard=cart.find((item)=>item.id===id)
    if(existingcard){
        existingcard.quantity+=1;
    }
    else{
           cart.push({
        id,
        name,
        price,
        quantity:1,
    });
    }
   
    updateCart()
}

function updateCart(){
cartContainer.innerHTML="";
console.log(cart);
cart.forEach(item => {
    const cartitem=document.createElement('div')
    cartitem.className="space-y-2";
    cartitem.innerHTML=`
        
            <div class="bg-cyan-200">
             <div class="flex justify-between items-center">
                   <div>
                   <h2 class="font-bold">${item.name}</h2>
                  <p class="font-bold">${item.price}x${item.quantity}</p>
                  </div>
                
                   <button class="font-bold">x</button>
               </div>
              
                  <p class="text-right font-semibold">$${item.price *  item.quantity}</p>
            </div>
           
             


    `
    cartContainer.appendChild(cartitem)

});
}
 loadCategory()
loadtrees()