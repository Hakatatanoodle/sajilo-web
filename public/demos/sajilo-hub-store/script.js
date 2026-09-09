const products=[
{id:1,name:"Classic Black Hoodie",category:"men",price:3999,old:4999,rating:4.6,sale:true,discount:20,colors:["#111","#444","#ddd","#18263a"],img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"},
{id:2,name:"Oversized Beige Tee",category:"women",price:1999,old:null,rating:4.3,sale:false,colors:["#ded3bf","#6c7048","#4d392d","#eee"],img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"},
{id:3,name:"Denim Jacket",category:"men",price:5999,old:6999,rating:4.7,sale:true,discount:15,colors:["#16446a","#8bb2ce"],img:"https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=85"},
{id:4,name:"Polo T-Shirt",category:"men",price:2499,old:null,rating:4.2,sale:false,colors:["#eee","#162443","#111"],img:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=85"},
{id:5,name:"Olive Everyday Sweatshirt",category:"women",price:3399,old:3799,rating:4.5,sale:true,discount:10,colors:["#374331","#ccc","#111","#eee"],img:"https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=85"},
{id:6,name:"Utility Cargo Pants",category:"men",price:4499,old:null,rating:4.4,sale:false,colors:["#111","#676650","#d3c4a8"],img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85"},
{id:7,name:"Maroon Essential Hoodie",category:"women",price:3749,old:4999,rating:4.6,sale:true,discount:25,colors:["#64182e","#999","#222","#253149"],img:"https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=700&q=85"},
{id:8,name:"Checkered Overshirt",category:"men",price:2999,old:null,rating:4.1,sale:false,colors:["#111","#5d1d24","#17406c"],img:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=85"},
{id:9,name:"Minimal Knit Cardigan",category:"women",price:4299,old:null,rating:4.8,sale:false,colors:["#c6b59f","#222","#eee"],img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85"},
{id:10,name:"Everyday Cap",category:"accessories",price:1699,old:2199,rating:4.4,sale:true,discount:20,colors:["#111","#eee","#7c674e"],img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=85"},
{id:11,name:"Canvas Tote",category:"accessories",price:1899,old:null,rating:4.2,sale:false,colors:["#d9c7a8","#111"],img:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=85"},
{id:12,name:"Relaxed Blue Shirt",category:"women",price:3199,old:null,rating:4.0,sale:false,colors:["#7fa0b8","#fff","#222"],img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85"}
];

const grid=document.querySelector("#productGrid"),count=document.querySelector("#productCount"),empty=document.querySelector("#emptyState");
const search=document.querySelector("#searchInput"), sort=document.querySelector("#sortFilter"), rating=document.querySelector("#ratingFilter"), category=document.querySelector("#categoryFilter");
let activeType="all", visible=8, selectedProduct=null;

function stars(n){let s="";for(let i=1;i<=5;i++)s+=i<=Math.round(n)?"★":"☆";return s}
function render(){
 let q=search.value.toLowerCase().trim();
 let list=products.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(category.value==="all"||p.category===category.value)&&(activeType==="all"||(activeType==="sale"?p.sale:!p.sale))&&(rating.value==="all"||p.rating>=Number(rating.value)));
 if(sort.value==="low")list.sort((a,b)=>a.price-b.price); if(sort.value==="high")list.sort((a,b)=>b.price-a.price); if(sort.value==="rating")list.sort((a,b)=>b.rating-a.rating);
 count.textContent=`${list.length} product${list.length!==1?"s":""}`;
 grid.innerHTML=list.slice(0,visible).map(p=>`<article class="product">
 <div class="product-img">${p.sale?`<span class="badge">-${p.discount}%</span>`:""}<button class="heart">♡</button><img loading="lazy" src="${p.img}" alt="${p.name}"></div>
 <div class="product-body"><h3>${p.name}</h3><div class="rating">${stars(p.rating)} <span>${p.rating.toFixed(1)} rating</span></div>
 <div class="price"><strong class="${p.sale?"sale":""}">Rs. ${p.price.toLocaleString("en-IN")}</strong>${p.old?`<span class="old">Rs. ${p.old.toLocaleString("en-IN")}</span>`:""}</div>
 <div class="swatches">${p.colors.map(c=>`<span class="swatch" style="background:${c}" title="Available color"></span>`).join("")}</div>
 <button class="buy" onclick="openCheckout(${p.id})">Order now</button></div></article>`).join("");
 empty.hidden=list.length>0;
 document.querySelector("#loadMore").style.display=list.length>visible?"block":"none";
}
function showShop(){document.querySelector("#shopView").hidden=false;document.querySelector("#locationView").hidden=true}
function showLocation(){document.querySelector("#shopView").hidden=true;document.querySelector("#locationView").hidden=false;window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".nav-link").forEach(x=>x.classList.remove("active"));if(b.classList.contains("nav-link"))b.classList.add("active");b.dataset.nav==="location"?showLocation():showShop()}));
[search,sort,rating,category].forEach(x=>x.addEventListener("input",()=>{visible=8;render()}));
document.querySelectorAll(".type-btn").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".type-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeType=b.dataset.type;visible=8;render()}));
document.querySelector("#loadMore").addEventListener("click",()=>{visible+=4;render()});
document.querySelector("#filterToggle").addEventListener("click",()=>document.querySelector("#filters").classList.toggle("open"));
document.querySelector("#shopNow").addEventListener("click",()=>document.querySelector(".catalog").scrollIntoView({behavior:"smooth"}));
document.querySelector("#menuBtn").addEventListener("click",()=>{document.querySelector("nav").style.display=document.querySelector("nav").style.display==="flex"?"none":"flex"});
function openCheckout(id){
 selectedProduct=products.find(p=>p.id===id);
 document.querySelector("#checkoutProduct").innerHTML=`<img src="${selectedProduct.img}" alt=""><div><strong>${selectedProduct.name}</strong><p>Rs. ${selectedProduct.price.toLocaleString("en-IN")} · ${selectedProduct.rating} rating</p></div>`;
 document.querySelector("#colorSelect").innerHTML=selectedProduct.colors.map((c,i)=>`<option>Color ${i+1}</option>`).join("");
 document.querySelector("#summarySubtotal").textContent=`Rs. ${selectedProduct.price.toLocaleString("en-IN")}`;
 document.querySelector("#summaryTotal").textContent=`Rs. ${(selectedProduct.price+299).toLocaleString("en-IN")}`;
 document.querySelector("#checkoutModal").hidden=false;
 document.body.style.overflow="hidden";
}
document.querySelector("#closeCheckout").addEventListener("click",()=>{document.querySelector("#checkoutModal").hidden=true;document.body.style.overflow=""});
document.querySelector("#orderForm").addEventListener("submit",e=>{e.preventDefault();document.querySelector("#checkoutModal").hidden=true;document.body.style.overflow="";showToast("Order placed successfully — demo mode.");document.querySelector("#cartCount").textContent=Number(document.querySelector("#cartCount").textContent)+1;e.target.reset()});
document.querySelectorAll("#directionsBtn,#directionsBtn2").forEach(b=>b.addEventListener("click",()=>showToast("Demo map: connect Google Maps or Mapbox for live directions.")));
function showToast(t){const x=document.querySelector("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2800)}
render();
