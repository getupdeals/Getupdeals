// Sample structure based on champion marketing strategy

const productSections = {
  trending: 'products-trending',
  topRated: 'products-top-rated',
  editors: 'products-editors',
  recently: 'products-recently'
};

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    Object.entries(productSections).forEach(([key, elementId]) => {
      const sectionProducts = getRandomProducts(data, 8);
      renderProducts(sectionProducts, document.getElementById(elementId));
    });
  });

function getRandomProducts(data, count) {
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function renderProducts(products, container) {
  const template = document.getElementById('product-card-template');

  products.forEach(product => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.main-img').src = product.images[0];
    clone.querySelector('.product-title').textContent = product.title;
    clone.querySelector('.product-price').textContent = `₹${product.price}`;
    clone.querySelector('.buy-now').href = product.link;

    // Rating
    const rating = document.createElement('div');
    rating.className = 'rating-stars';
    const fullStars = Math.floor(product.rating || 4);
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.innerHTML = i < fullStars ? '★' : '☆';
      rating.appendChild(star);
    }
    clone.querySelector('.product-rating').appendChild(rating);

    // Reviews
    clone.querySelector('.product-reviews').textContent = `${product.reviews || 120}+ reviews`;

    // Urgency
    if (product.stock && product.stock <= 3) {
      clone.querySelector('.product-urgency').textContent = `⚠️ Only ${product.stock} left! Hurry!`;
    }

    // Smart tag
    clone.querySelector('.product-tag').textContent = product.boughtThisMonth >= 200 ? '🔥 Hot' : '⭐ Pick';

    container.appendChild(clone);
  });
}
