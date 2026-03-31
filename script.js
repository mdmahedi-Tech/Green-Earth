
const catchcontainer=document.getElementById('catagery-container');
const treecontainer=document.getElementById('treeContainer');
const loadingSpeener=document.getElementById('loadingspeener');
const alltreesbutton=document.getElementById('alltreesbutton');

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
            <button class="btn btn-primary">add card</button>
            </div>
        </div>
        </div>
    
    `
    treecontainer.appendChild(card)
    })
}
 loadCategory()
loadtrees()