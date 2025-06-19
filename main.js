let products = [];
let currentImages = [];
let currentImageIndex = 0;

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    populateCategories(products);
    renderProducts(products);
  });

function populateCategories(data) {
  const categories = [...new Set(data.map(p => p.category))];
  const filter = document.getElementById("categoryFilter");

  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filter.appendChild(opt);
  });

  filter.addEventListener("change", () => {
    applyFilters();
  });

  document.getElementById("searchInput").addEventListener("input", () => {
    applyFilters();
  });
}

function applyFilters() {
  const category = document.getElementById("categoryFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(p => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesSearch = p.title.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  renderProducts(filtered);
}

function renderProducts(list) {
  const gallery = document.getElementById("product-gallery");
  gallery.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}" class="main-image" />
      <div class="product-title">${product.title}</div>
      <div class="product-category">${product.category}</div>
      <div class="product-price">₹${product.price}</div>
      <a class="buy-button" href="${product.link}" target="_blank">Buy Now</a>
    `;

    card.querySelector(".main-image").addEventListener("click", () => {
      openModal(product.images);
    });

    gallery.appendChild(card);
  });
}

// Modal Logic
function openModal(images) {
  currentImages = images;
  currentImageIndex = 0;
  document.getElementById("modalImage").src = currentImages[0];
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  document.getElementById("modalImage").src = currentImages[currentImageIndex];
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  document.getElementById("modalImage").src = currentImages[currentImageIndex];
}