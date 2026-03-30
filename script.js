
const catchcontainer=document.getElementById('catagery-container');
 async function loadCategory(){
// async await
const res= await fetch("https://openapi.programming-hero.com/api/categories")

const data=await res.json()
console.log(data)

data.categories.forEach(category=> {
    console.log(category)
    const btn=document.createElement("button");
    btn.className="btn btn-outline w-full";
    btn.innerText= category.category_name
   
    
    catchcontainer.appendChild(btn);
});

}
loadCategory()