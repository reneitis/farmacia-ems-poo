const products = [
    { id: 1, name: "Paracetamol", price: 10.00, icon: "fas fa-pills" },
    { id: 2, name: "Ibuprofeno", price: 15.00, icon: "fas fa-capsules" },
    { id: 3, name: "Dipirona", price: 12.00, icon: "fas fa-tablets" },
    { id: 4, name: "Amoxicilina", price: 25.00, icon: "fas fa-prescription-bottle" },
    { id: 5, name: "Loratadina", price: 8.00, icon: "fas fa-syringe" },
    { id: 6, name: "Dorflex", price: 11.00, icon: "fas fa-syringe" },
];

const cart = [];

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    document.getElementById("cart-icon").addEventListener("click", redirectToCart);
    showSlides(slideIndex); // Inicializa o slideshow
});

function displayProducts() {
    const productList = document.querySelector('#product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <div class="product-icon">
                <i class="${product.icon}"></i>
            </div>
            <h3>${product.name}</h3>
            <p>Preço: R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
        `;
        productList.appendChild(productItem);
    });
}

function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        animateAddToCart(productId);
    }

    displayProducts();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function animateAddToCart(productId) {
    const productItem = document.querySelector(`.product-item button[onclick="addToCart(${productId})"]`).parentElement;
    const cartIcon = document.getElementById('cart-icon');
    const clone = productItem.cloneNode(true);

    clone.style.position = 'absolute';
    clone.style.top = `${productItem.getBoundingClientRect().top}px`;
    clone.style.left = `${productItem.getBoundingClientRect().left}px`;
    clone.style.width = `${productItem.offsetWidth}px`;
    clone.style.height = `${productItem.offsetHeight}px`;
    clone.classList.add('add-to-cart');

    document.body.appendChild(clone);

    const cartIconRect = cartIcon.getBoundingClientRect();
    clone.style.transform = `translate(${cartIconRect.left - productItem.getBoundingClientRect().left}px, ${cartIconRect.top - productItem.getBoundingClientRect().top}px) scale(0.1)`;
    clone.style.transition = 'transform 0.5s ease-in-out';

    setTimeout(() => {
        document.body.removeChild(clone);
    }, 500);
}

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function redirectToCart() {
    window.location.href = 'carrinho/carrinho.html';
}

