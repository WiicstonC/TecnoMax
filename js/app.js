const products = [
    {
        id:1,
        name:"REALME 15 C",
        brand:"Realme",
        category:"Celular",
        price:899,
        camera:"50MP",
        cpu:"Snapdragon 8 Gen 2",
        ram:"8GB",
        storage:"256GB",
        description:"Pantalla AMOLED 5G",
        image:"img/productos/REALMI15C.jpg",
        bestSeller:true,
        offer:false
    },
    {
        id:2,
        name:"Infinix GT 30",
        brand:"Infinix",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/INFINIXGT30.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:3,
        name:"Infinix Note 50s",
        brand:"Infinix",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/INFINIXNOTE50S.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:4,
        name:"Infinix Hot 60 Pro+",
        brand:"Infinix",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/INFINIXHOT60PRO.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:5,
        name:"Infinix Smart 10",
        brand:"Infinix",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/INFINIXSMART10.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:6,
        name:"Honor 200",
        brand:"Honor",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/HONOR200.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:7,
        name:"Honor X5c",
        brand:"Infinix",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/HONORX5C.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:8,
        name:"Tecno Spark GO",
        brand:"Tecno",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/TECNOSPARKGO2.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:9,
        name:"Samsung A26 5G",
        brand:"Samsung",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/SAMSUNGA26.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:10,
        name:"Samsung A 16",
        brand:"Samsung",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/SAMSUNGA16.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:11,
        name:"Samsung A 06",
        brand:"Samsung",
        price:999,
        camera:"48MP",
        cpu:"A15 Bionic",
        ram:"6GB",
        storage:"256GB",
        description:"Cámara profesional",
        image:"img/productos/SAMSUNGA06.jpg",
        bestSeller:true,
        offer:true
    }
];

const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const bestSellerFilter = document.getElementById("bestSellerFilter");
const offerFilter = document.getElementById("offerFilter");

let compare = [];

const render = list => {
    catalog.innerHTML = list.map(p => `
        <article class="product">
            <img src="${p.image}" loading="lazy" alt="${p.name}">
            <h3>${p.name}</h3>

            <div class="specs">
                <span>📸 ${p.camera}</span>
                <span>🧠 ${p.cpu}</span>
            </div>

            <div class="specs">
                <span>💾 ${p.ram}</span>
                <span>📦 ${p.storage}</span>
            </div>

            <div class="price">$${p.price}</div>

            <div class="actions">
                <a class="buy" target="_blank"
                   href="https://wa.me/XXXXXXXXXX?text=Quiero comprar ${p.name}">
                   WhatsApp
                </a>
                <button class="compare" onclick="addCompare(${p.id})">Comparar</button>
            </div>
        </article>
    `).join("");
};

const applyFilters = () => {
    let list = [...products];

    if (searchInput.value)
        list = list.filter(p => p.name.toLowerCase().includes(searchInput.value.toLowerCase()));

    if (brandFilter.value)
        list = list.filter(p => p.brand === brandFilter.value);

    if (minPrice.value)
        list = list.filter(p => p.price >= minPrice.value);

    if (maxPrice.value)
        list = list.filter(p => p.price <= maxPrice.value);

    if (bestSellerFilter.checked)
        list = list.filter(p => p.bestSeller);

    if (offerFilter.checked)
        list = list.filter(p => p.offer);

    render(list);
};

window.addCompare = id => {
    const p = products.find(x => x.id === id);
    if (!compare.includes(p) && compare.length < 2) compare.push(p);
    if (compare.length === 2) showCompare();
};

const showCompare = () => {
    document.getElementById("compareContainer").innerHTML =
        compare.map(p => `<div><h3>${p.name}</h3><p>${p.price}</p></div>`).join("");
    document.getElementById("comparison").classList.remove("hidden");
};

document.getElementById("closeCompare").onclick = () => {
    compare = [];
    document.getElementById("comparison").classList.add("hidden");
};

[...new Set(products.map(p => p.brand))].forEach(b =>
    brandFilter.innerHTML += `<option value="${b}">${b}</option>`
);

document.querySelectorAll("input, select").forEach(e => e.oninput = applyFilters);
render(products);

const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}, 4000); // cambia cada 4 segundos
