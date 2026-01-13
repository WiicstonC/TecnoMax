const products = [
    {
        id:1,
        name:"REALME 15 C",
        brand:"Realme",
        category:"Celular",
        camera:"50MP",
        cpu:" MediaTek Helio G81-Ultra",
        ram:"8GB",
        storage:"128GB",
        battery:"6000 mAh",
        charge:"33W",
        screen:"6.9” AMOLED",
        refresh:"120Hz",
        description:"Pantalla AMOLED 5G",
        image:"img/productos/REALMI15C.jpg",
        bestSeller:true,
        offer:false
    },
    {
        id:2,
        name:"Infinix GT 30",
        brand:"Infinix",
        camera:"64MP",
        cpu:"Dimensity 7400",
        ram:"12GB",
        storage:"256GB",
        battery:"5500 mAh",
        charge:"45W",
        screen:"6.78” AMOLED",
        refresh:"144Hz",
        description:"Cámara profesional",
        image:"img/productos/INFINIXGT30.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:3,
        name:"Infinix Note 50s",
        brand:"Infinix",
        camera:"64MP",
        cpu:"MediaTek Dimensity 7300 Ultimate",
        ram:"8GB",
        storage:"256GB",
        battery:"5500 mAh",
        charge:"45W",
        screen:"6.78” AMOLED",
        refresh:"144Hz",
        description:"Cámara profesional",
        image:"img/productos/INFINIXNOTE50S.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:4,
        name:"Infinix Hot 60 Pro+",
        brand:"Infinix",
        camera:"50MP",
        cpu:"MediaTek Helio G200",
        ram:"8GB",
        storage:"256GB",
        battery:"5160 mAh",
        charge:"45W",
        screen:"6.78” AMOLED",
        refresh:"120Hz",
        description:"Cámara profesional",
        image:"img/productos/INFINIXHOT60PRO.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:5,
        name:"Infinix Smart 10",
        brand:"Infinix",
        camera:"8MP",
        cpu:"Unisoc T7250 Octa-Core",
        ram:"6GB",
        storage:"128GB",
        battery:"5000 mAh",
        charge:"15W",
        screen:"6.67” IPS LCD",
        refresh:"120Hz",
        description:"Cámara profesional",
        image:"img/productos/INFINIXSMART10.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:6,
        name:"Honor 200",
        brand:"Honor",
        camera:"50MP",
        cpu:"Qualcomm Snapdragon 7 Gen 3.",
        ram:"8GB",
        storage:"256GB",
        battery:"5200 mAh",
        charge:"100W",
        screen:"6.7” AMOLED",
        refresh:"120Hz",
        description:"Cámara profesional",
        image:"img/productos/HONOR200.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:7,
        name:"Honor X5c",
        brand:"Honor",
        camera:"50MP",
        cpu:"MediaTek Helio G81",
        ram:"8GB",
        storage:"128GB",
        battery:"5250 mAh",
        charge:"15W",
        screen:"6.74” AMOLED",
        refresh:"90Hz",
        description:"Cámara profesional",
        image:"img/productos/HONORX5C.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:8,
        name:"Tecno Spark GO",
        brand:"Tecno",
        camera:"13MP",
        cpu:"Unisoc T7250 Octa-Core",
        ram:"4GB",
        storage:"128GB",
        battery:"5000 mAh",
        charge:"15W",
        screen:"6.67” AMOLED",
        refresh:"120Hz",
        description:"Cámara profesional",
        image:"img/productos/TECNOSPARKGO2.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:9,
        name:"Samsung A26 5G",
        brand:"Samsung",
        camera:"50MP",
        cpu:"Procesador de 8 núcleos (AP mejorado)",
        ram:"8GB",
        storage:"256GB",
        battery:"5000 mAh",
        charge:"25W",
        screen:"6.7” AMOLED",
        refresh:"120Hz",
        description:"Cámara profesional",
        image:"img/productos/SAMSUNGA26.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:10,
        name:"Samsung A 16",
        brand:"Samsung",
        camera:"50MP",
        cpu:"Helio G99",
        ram:"8GB",
        storage:"256GB",
        battery:"5000 mAh",
        charge:"25W",
        screen:"6.7” AMOLED",
        refresh:"90Hz",
        description:"Cámara profesional",
        image:"img/productos/SAMSUNGA16.jpg",
        bestSeller:true,
        offer:true
    },
    {
        id:11,
        name:"Samsung A 06",
        brand:"Samsung",
        camera:"50MP",
        cpu:"MediaTek Helio G85",
        ram:"4GB",
        storage:"128GB",
        battery:"5000 mAh",
        charge:"25W",
        screen:"6.7” PLS LCD",
        refresh:"90Hz",
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
                <span>🔋 ${p.battery}</span>
                <span>⚡ ${p.charge}</span>
            </div>

            <div class="specs">
                <span>📱 ${p.screen}</span>
                <span>🔄 ${p.refresh}</span>
            </div>

            <div class="actions">
                <a class="buy" target="_blank"
                   href="https://wa.me/573202147560?text=Hola, estoy interesado en el ${p.name}">
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
