const WA_NUMBER = "6285715385002";

const products = [
  {id:1,name:"Urban Leather Tote",cat:"tote",label:"TOTE",style:"Minimal • Spacious",price:79000,img:"assets/products/tas-cokelat-elegan.jpg",desc:"Tas tote cokelat dengan siluet clean dan handle ganda. Cocok untuk gaya casual sampai semi-formal."},
  {id:2,name:"Soft Curve Sling",cat:"sling",label:"SLING",style:"Soft • Elegant",price:75000,img:"assets/products/tas-sling-cream.jpg",desc:"Sling bag warna cream dengan bentuk melengkung dan aksen buckle yang memberi kesan rapi."},
  {id:3,name:"Midnight Curve",cat:"sling",label:"SLING",style:"Bold • Classic",price:80000,img:"assets/products/tas-sling-hitam.jpg",desc:"Warna hitam yang mudah dipadukan, dengan garis jahitan kontras dan hardware bernuansa gold."},
  {id:4,name:"Teddy Charm Tote",cat:"tote",label:"TOTE",style:"Cute • Daily",price:85000,img:"assets/products/tas-tote-putih-teddy.jpg",desc:"Tote putih dengan detail strap dan charm teddy untuk tampilan yang playful namun tetap clean."},
  {id:5,name:"Everyday Signature",cat:"handbag",label:"HANDBAG",style:"Clean • Everyday",price:78000,img:"assets/products/tas-handbag-putih.jpg",desc:"Handbag putih dengan buckle gold yang sederhana dan elegan. Pilihan aman untuk berbagai outfit."},
  {id:6,name:"Mini Lock Handbag",cat:"handbag",label:"HANDBAG",style:"Compact • Chic",price:76000,img:"assets/products/tas-sling-putih-detail.jpg",desc:"Model compact dengan flap dan pengunci metal. Ringkas tetapi tetap terlihat polished."},
  {id:7,name:"City Contrast Tote",cat:"tote",label:"TOTE",style:"Contrast • Modern",price:83000,img:"assets/products/tas-tote-putih-cokelat.jpg",desc:"Perpaduan putih dan cokelat dengan panel tekstur yang membuat tampilan lebih berkarakter."},
  {id:8,name:"Braided Hobo",cat:"hobo",label:"HOBO",style:"Soft • Trendy",price:82000,img:"assets/products/tas-hobo-cream-teddy.jpg",desc:"Hobo bernuansa cream dengan handle braided dan charm teddy. Cocok untuk gaya santai yang tetap stylish."},
  {id:9,name:"Mocha Frame Hobo",cat:"hobo",label:"HOBO",style:"Warm • Elegant",price:81000,img:"assets/products/tas-hobo-mocha-teddy.jpg",desc:"Hobo warna mocha dengan detail cokelat gelap dan charm. Memberi nuansa hangat dan dewasa."},
  {id:10,name:"Mono Lock Tote",cat:"tote",label:"TOTE",style:"Monochrome • Smart",price:84000,img:"assets/products/tas-tote-putih-hitam.jpg",desc:"Tote putih dengan aksen hitam pada handle dan strap pengunci. Tampilan monochrome yang modern."},
  {id:11,name:"Classic Side Handbag",cat:"handbag",label:"HANDBAG",style:"Clean • Practical",price:77000,img:"assets/products/tas-handbag-putih-samping.jpg",desc:"Handbag putih dengan bentuk tegas dan handle pendek. Cocok untuk aktivitas harian dan acara santai."},
  {id:12,name:"Gold Accent Tote",cat:"tote",label:"TOTE",style:"Elegant • Premium",price:85000,img:"assets/products/tas-tote-putih-cokelat-gold.jpg",desc:"Tote putih dengan aksen cokelat dan detail hardware gold yang membuat tampilannya lebih premium."},
  {id:13,name:"Brown Essential Tote",cat:"tote",label:"TOTE",style:"Simple • Spacious",price:80000,img:"assets/products/tas-tote-cokelat.jpg",desc:"Tote cokelat dengan desain minimal dan ruang yang praktis untuk membawa kebutuhan sehari-hari."},
  {id:14,name:"Soft White Sling",cat:"sling",label:"SLING",style:"Soft • Feminine",price:76000,img:"assets/products/tas-sling-putih.jpg",desc:"Sling bag putih dengan flap dan detail pengunci gold. Desainnya clean dan mudah dipadukan."},
  {id:15,name:"White Gold Signature",cat:"handbag",label:"HANDBAG",style:"Elegant • Signature",price:83000,img:"assets/products/tas-tote-putih-gold.jpg",desc:"Tas putih dengan handle rounded dan aksen gold. Pilihan elegan untuk gaya yang simpel tetapi berkelas."}
];

let currentFilter = "all";
let currentSearch = "";
const rupiah = n => new Intl.NumberFormat("id-ID", {style:"currency", currency:"IDR", maximumFractionDigits:0}).format(n);

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const query = currentSearch.toLowerCase().trim();
  const list = products.filter(p => {
    const matchesFilter = currentFilter === "all" || p.cat === currentFilter;
    const haystack = `${p.name} ${p.cat} ${p.style} ${p.label} ${p.desc}`.toLowerCase();
    return matchesFilter && haystack.includes(query);
  });

  grid.innerHTML = list.map((p, i) => `
    <article class="product-card reveal visible" onclick="openProduct(${p.id})" style="--delay:${i * 35}ms">
      <div class="product-image">
        <div class="image-backdrop"></div>
        <img src="${p.img}" alt="${p.name} — High Markett" loading="lazy">
        <span class="product-tag">${p.label}</span>
        <button class="product-arrow" aria-label="Lihat ${p.name}" onclick="event.stopPropagation();openProduct(${p.id})">↗</button>
      </div>
      <div class="product-info">
        <span class="cat">${p.cat.toUpperCase()} / HIGH MARKETT</span>
        <h3>${p.name}</h3>
        <p>${p.style}</p>
        <div class="price-hidden">Harga ada di deskripsi produk</div>
      </div>
    </article>
  `).join("");
  empty.style.display = list.length ? "none" : "block";
}

function openProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  document.getElementById("modalImage").src = p.img;
  document.getElementById("modalImage").alt = p.name;
  document.getElementById("modalCategory").textContent = `${p.label} / HIGH MARKETT`;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = rupiah(p.price);
  document.getElementById("modalStyle").textContent = p.style;
  const message = `Halo High Markett, saya tertarik membeli ${p.name}. Harga: ${rupiah(p.price)}. Apakah produknya masih tersedia?`;
  document.getElementById("modalWA").href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  document.getElementById("productModal").classList.add("open");
  document.getElementById("productModal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProduct(){
  document.getElementById("productModal").classList.remove("open");
  document.getElementById("productModal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Filters
Array.from(document.querySelectorAll(".filter")).forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  renderProducts();
}));

document.getElementById("productSearch").addEventListener("input", e => {
  currentSearch = e.target.value;
  renderProducts();
});

// Search overlay
const overlay = document.getElementById("searchOverlay");
document.getElementById("openSearch").onclick = () => {
  overlay.classList.add("open");
  setTimeout(() => document.getElementById("overlaySearch").focus(), 50);
};
document.getElementById("closeSearch").onclick = () => overlay.classList.remove("open");
document.getElementById("overlaySearch").addEventListener("input", e => document.getElementById("productSearch").value = e.target.value);
document.getElementById("overlaySearch").addEventListener("keydown", e => {
  if(e.key === "Enter"){
    currentSearch = e.target.value;
    document.getElementById("productSearch").value = currentSearch;
    overlay.classList.remove("open");
    document.getElementById("koleksi").scrollIntoView({behavior:"smooth"});
    renderProducts();
  }
});

document.addEventListener("keydown", e => {
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"){
    e.preventDefault();
    document.getElementById("openSearch").click();
  }
  if(e.key === "Escape"){
    overlay.classList.remove("open");
    closeProduct();
  }
});

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.onclick = () => nav.classList.toggle("open");
nav.querySelectorAll("a").forEach(a => a.onclick = () => nav.classList.remove("open"));

// Reveal animation
const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if(e.isIntersecting) e.target.classList.add("visible");
}), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Subtle cursor light on desktop
const cursorGlow = document.getElementById("cursorGlow");
window.addEventListener("pointermove", e => {
  if(window.innerWidth > 800){
    cursorGlow.style.transform = `translate3d(${e.clientX - 180}px, ${e.clientY - 180}px, 0)`;
  }
});

renderProducts();
