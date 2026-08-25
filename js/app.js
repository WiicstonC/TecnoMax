const products = [
  {id:1,name:'REALME 15 C',brand:'Realme',camera:'50 MP',cpu:'Helio G81-Ultra',ram:'8 GB',storage:'128 GB',battery:'6000 mAh',charge:'33 W',screen:'6.9” AMOLED',refresh:'120 Hz',image:'img/productos/REALMI15C.jpg',bestSeller:true,offer:false},
  {id:2,name:'Infinix GT 30',brand:'Infinix',camera:'64 MP',cpu:'Dimensity 7400',ram:'12 GB',storage:'256 GB',battery:'5500 mAh',charge:'45 W',screen:'6.78” AMOLED',refresh:'144 Hz',image:'img/productos/INFINIXGT30.jpg',bestSeller:true,offer:true},
  {id:3,name:'Infinix Note 50s',brand:'Infinix',camera:'64 MP',cpu:'Dimensity 7300 Ultimate',ram:'8 GB',storage:'256 GB',battery:'5500 mAh',charge:'45 W',screen:'6.78” AMOLED',refresh:'144 Hz',image:'img/productos/INFINIXNOTE50S.jpg',bestSeller:true,offer:true},
  {id:4,name:'Infinix Hot 60 Pro+',brand:'Infinix',camera:'50 MP',cpu:'Helio G200',ram:'8 GB',storage:'256 GB',battery:'5160 mAh',charge:'45 W',screen:'6.78” AMOLED',refresh:'120 Hz',image:'img/productos/INFINIXHOT60PRO.jpg',bestSeller:true,offer:true},
  {id:5,name:'Infinix Smart 10',brand:'Infinix',camera:'8 MP',cpu:'Unisoc T7250',ram:'6 GB',storage:'128 GB',battery:'5000 mAh',charge:'15 W',screen:'6.67” IPS LCD',refresh:'120 Hz',image:'img/productos/INFINIXSMART10.jpg',bestSeller:true,offer:true},
  {id:6,name:'HONOR 200',brand:'Honor',camera:'50 MP',cpu:'Snapdragon 7 Gen 3',ram:'8 GB',storage:'256 GB',battery:'5200 mAh',charge:'100 W',screen:'6.7” AMOLED',refresh:'120 Hz',image:'img/productos/HONOR200.jpg',bestSeller:true,offer:true},
  {id:7,name:'HONOR X5c',brand:'Honor',camera:'50 MP',cpu:'Helio G81',ram:'8 GB',storage:'128 GB',battery:'5250 mAh',charge:'15 W',screen:'6.74” LCD',refresh:'90 Hz',image:'img/productos/HONORX5C.jpg',bestSeller:true,offer:true},
  {id:8,name:'Tecno Spark GO',brand:'Tecno',camera:'13 MP',cpu:'Unisoc T7250',ram:'4 GB',storage:'128 GB',battery:'5000 mAh',charge:'15 W',screen:'6.67” IPS',refresh:'120 Hz',image:'img/productos/TECNOSPARKGO2.jpg',bestSeller:true,offer:true},
  {id:9,name:'Samsung Galaxy A26 5G',brand:'Samsung',camera:'50 MP',cpu:'Exynos 1380',ram:'8 GB',storage:'256 GB',battery:'5000 mAh',charge:'25 W',screen:'6.7” Super AMOLED',refresh:'120 Hz',image:'img/productos/SAMSUNGA26.jpg',bestSeller:true,offer:true},
  {id:10,name:'Samsung Galaxy A16',brand:'Samsung',camera:'50 MP',cpu:'Helio G99',ram:'8 GB',storage:'256 GB',battery:'5000 mAh',charge:'25 W',screen:'6.7” Super AMOLED',refresh:'90 Hz',image:'img/productos/SAMSUNGA16.jpg',bestSeller:true,offer:true},
  {id:11,name:'Samsung Galaxy A06',brand:'Samsung',camera:'50 MP',cpu:'Helio G85',ram:'4 GB',storage:'128 GB',battery:'5000 mAh',charge:'25 W',screen:'6.7” PLS LCD',refresh:'90 Hz',image:'img/productos/SAMSUNGA06.jpg',bestSeller:true,offer:true}
];

const technicalProducts = [
  {name:'Samsung Galaxy A55 5G',camera:'Triple 50 MP',cpu:'Exynos 1480',battery:'5000 mAh',screen:'6.6” FHD+ Super AMOLED',tone:''},
  {name:'Xiaomi Redmi Note 13 Pro',camera:'200 MP',cpu:'Snapdragon 7s Gen 2',battery:'5100 mAh',screen:'6.67” AMOLED',tone:'red'},
  {name:'iPhone 14',camera:'Dual 12 MP',cpu:'Apple A15 Bionic',battery:'Hasta 20 h de video',screen:'6.1” Super Retina XDR',tone:'dark'},
  {name:'Motorola Moto G54 5G',camera:'50 MP con OIS',cpu:'Dimensity 7020',battery:'5000 mAh',screen:'6.5” FHD+ 120 Hz',tone:''}
];

const catalog = document.getElementById('catalog');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const bestSellerFilter = document.getElementById('bestSellerFilter');
const offerFilter = document.getElementById('offerFilter');
const clearFilters = document.getElementById('clearFilters');
const compareModal = document.getElementById('comparison');
const compareContainer = document.getElementById('compareContainer');
let compare = [];

// Los productos no tienen precio público cargado en el catálogo actual.
// Ocultamos el filtro hasta que el inventario tenga precios reales para no inventar valores.
const priceFilter = document.querySelector('.price-filter');
if (priceFilter && !products.some(p => Number.isFinite(p.price))) priceFilter.remove();

const escapeHTML = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function productImage(product){
  return `<img src="${escapeHTML(product.image)}" loading="lazy" alt="${escapeHTML(product.name)}" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')"><div class="product-placeholder hidden" aria-hidden="true"></div>`;
}

function render(list){
  emptyState.classList.toggle('hidden', list.length !== 0);
  catalog.innerHTML = list.map(product => `
    <article class="product">
      <div class="product-media">${productImage(product)}</div>
      <div class="product-info">
        <div class="product-brand">${escapeHTML(product.brand)}</div>
        <h3>${escapeHTML(product.name)}</h3>
        <div class="specs">
          <div class="spec"><b>Cámara</b>${escapeHTML(product.camera)}</div>
          <div class="spec"><b>Procesador</b>${escapeHTML(product.cpu)}</div>
          <div class="spec"><b>Batería</b>${escapeHTML(product.battery)}</div>
          <div class="spec"><b>Pantalla</b>${escapeHTML(product.screen)}</div>
        </div>
        <div class="product-footer">
          <a class="buy" href="https://wa.me/573202147560?text=${encodeURIComponent(`Hola TecnoMax, estoy interesado en el ${product.name}. ¿Tienen disponibilidad?`)}" target="_blank" rel="noopener">WhatsApp</a>
          <button class="compare" type="button" data-compare="${product.id}">Comparar</button>
        </div>
      </div>
    </article>`).join('');
}

function applyFilters(){
  const query = searchInput.value.trim().toLowerCase();
  let list = products.filter(p => {
    const searchable = `${p.name} ${p.brand} ${p.cpu} ${p.camera}`.toLowerCase();
    if(query && !searchable.includes(query)) return false;
    if(brandFilter.value && p.brand !== brandFilter.value) return false;
    if(bestSellerFilter.checked && !p.bestSeller) return false;
    if(offerFilter.checked && !p.offer) return false;
    if(minPrice?.value && Number.isFinite(p.price) && p.price < Number(minPrice.value)) return false;
    if(maxPrice?.value && Number.isFinite(p.price) && p.price > Number(maxPrice.value)) return false;
    return true;
  });
  render(list);
}

function populateBrands(){
  [...new Set(products.map(p => p.brand))].sort().forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}

function showComparison(){
  compareContainer.innerHTML = `<div class="compare-grid">${compare.map(p => `
    <div class="compare-item"><h3>${escapeHTML(p.name)}</h3><p><b>Cámara:</b> ${escapeHTML(p.camera)}</p><p><b>Procesador:</b> ${escapeHTML(p.cpu)}</p><p><b>RAM:</b> ${escapeHTML(p.ram)}</p><p><b>Almacenamiento:</b> ${escapeHTML(p.storage)}</p><p><b>Batería:</b> ${escapeHTML(p.battery)}</p><p><b>Pantalla:</b> ${escapeHTML(p.screen)}</p></div>`).join('')}</div>`;
  compareModal.classList.remove('hidden');
}

catalog.addEventListener('click', event => {
  const button = event.target.closest('[data-compare]');
  if(!button) return;
  const product = products.find(p => p.id === Number(button.dataset.compare));
  if(!product) return;
  if(!compare.some(p => p.id === product.id)) compare.push(product);
  if(compare.length > 2) compare.shift();
  if(compare.length === 2) showComparison();
});

document.getElementById('closeCompare').addEventListener('click', () => { compare=[]; compareModal.classList.add('hidden'); });
compareModal.addEventListener('click', e => { if(e.target === compareModal) compareModal.classList.add('hidden'); });

[searchInput, brandFilter, minPrice, maxPrice, bestSellerFilter, offerFilter].filter(Boolean).forEach(el => el.addEventListener('input', applyFilters));
clearFilters.addEventListener('click', () => {
  searchInput.value=''; brandFilter.value=''; bestSellerFilter.checked=false; offerFilter.checked=false;
  if(minPrice) minPrice.value=''; if(maxPrice) maxPrice.value=''; applyFilters();
});

document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const name = button.dataset.product;
  window.open(`https://wa.me/573202147560?text=${encodeURIComponent(`Hola TecnoMax, quiero conocer el ${name}. ¿Me pueden compartir disponibilidad y precio?`)}`, '_blank', 'noopener');
}));

function renderTechnical(){
  document.getElementById('technicalGrid').innerHTML = technicalProducts.map(p => `
    <article class="technical-card">
      <div class="technical-device ${p.tone}" aria-hidden="true"></div>
      <div class="technical-info"><h3>${escapeHTML(p.name)}</h3><p><b>Procesador:</b> ${escapeHTML(p.cpu)}</p><p><b>Cámara:</b> ${escapeHTML(p.camera)}</p><p><b>Batería:</b> ${escapeHTML(p.battery)}</p><p><b>Pantalla:</b> ${escapeHTML(p.screen)}</p></div>
    </article>`).join('');
}

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = document.getElementById('heroDots');
let currentSlide = 0;
let slideTimer;
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type='button'; dot.ariaLabel=`Promoción ${index+1}`; dot.addEventListener('click',()=>goToSlide(index));
  dots.appendChild(dot);
});
function goToSlide(index){
  slides[currentSlide].classList.remove('is-active');
  dots.children[currentSlide].classList.remove('active');
  currentSlide=(index+slides.length)%slides.length;
  slides[currentSlide].classList.add('is-active');
  dots.children[currentSlide].classList.add('active');
  restartTimer();
}
function restartTimer(){clearInterval(slideTimer);slideTimer=setInterval(()=>goToSlide(currentSlide+1),5000)}
document.getElementById('heroPrev').addEventListener('click',()=>goToSlide(currentSlide-1));
document.getElementById('heroNext').addEventListener('click',()=>goToSlide(currentSlide+1));
goToSlide(0);

populateBrands();
renderTechnical();
render(products);
