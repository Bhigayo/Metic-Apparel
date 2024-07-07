let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    updateCartItems();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = 'cart.html';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartItems();
}
document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.addEventListener("mouseenter", function() {
        dropdown.querySelector(".dropdown-content").style.display = "flex";
    });
    dropdown.addEventListener("mouseleave", function() {
        dropdown.querySelector(".dropdown-content").style.display = "none";
    });
});
var slideIndex = 0;
    carousel();

    function carousel() {
        var slides = document.getElementsByClassName("slide");
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.transform = "translateX(-" + slideIndex * 100 + "%)";
        }
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        setTimeout(carousel, 3000); // Change slide every 3 seconds
    }
    
    document.querySelectorAll('.currency-dropdown .dropdown a').forEach(currencyLink => {
        currencyLink.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedCurrency = e.target.getAttribute('data-currency');
            document.querySelector('.currency-dropdown > a').textContent = selectedCurrency;
            updatePrices(selectedCurrency);
        });
    });

    function updatePrices(currency) {
        document.querySelectorAll('.price').forEach(priceElement => {
            const price = priceElement.getAttribute(`data-${currency.toLowerCase()}`);
            priceElement.textContent = `${currency} ${price}`;
        });
    }
    document.querySelectorAll('.currency-dropdown .dropdown a').forEach(currencyLink => {
        currencyLink.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedCurrency = e.target.getAttribute('data-currency');
            document.querySelector('.currency-dropdown > a').textContent = selectedCurrency;
            updatePrices(selectedCurrency);
        });
    });

    function updatePrices(currency) {
        document.querySelectorAll('.price').forEach(priceElement => {
            const price = priceElement.getAttribute(`data-${currency.toLowerCase()}`);
            priceElement.textContent = `${currency} ${price}`;
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;
    
        const addToCartButtons = document.querySelectorAll('.product button');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productElement = button.parentElement;
                const product = {
                    id: productElement.dataset.id,
                    name: productElement.dataset.name,
                    price: productElement.querySelector('.price').dataset.usd,
                    quantity: 1
                };
                addToCart(product);
            });
        });
    
        function addToCart(product) {
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCount.textContent = cart.length;
            alert(`${product.name} added to cart`);
        }
    
        const currencyDropdownItems = document.querySelectorAll('.currency-dropdown .dropdown a');
        currencyDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const currency = item.dataset.currency;
                updateCurrency(currency);
            });
        });
    
        function updateCurrency(currency) {
            const prices = document.querySelectorAll('.price');
            prices.forEach(price => {
                price.textContent = price.dataset[currency.toLowerCase()] + ' ' + currency;
            });
        }
    });
    document.addEventListener('DOMContentLoaded', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;
    
        const addToCartButtons = document.querySelectorAll('.product button');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productElement = button.parentElement;
                const product = {
                    id: productElement.dataset.id,
                    name: productElement.dataset.name,
                    price: parseFloat(productElement.querySelector('.price').dataset.usd),
                    quantity: 1
                };
                addToCart(product);
            });
        });
    
        function addToCart(product) {
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${product.name} added to cart`);
        }
    
        function updateCartCount() {
            cartCount.textContent = cart.length;
        }
    
        const currencyDropdownItems = document.querySelectorAll('.currency-dropdown .dropdown a');
        currencyDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const currency = item.dataset.currency;
                updateCurrency(currency);
            });
        });
    
        function updateCurrency(currency) {
            const prices = document.querySelectorAll('.price');
            prices.forEach(price => {
                price.textContent = price.dataset[currency.toLowerCase()] + ' ' + currency;
            });
        }
    });
const cartItems = [
    {
        id: 1,
        name: "HF PANEL CAP ORANGE - ONE SIZE FITS ALL, ORANGE",
        price: 100.00,
        quantity: 1,
        image: "path/to/image.png"
    }
];

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button class="remove-btn" data-id="${item.id}">x</button><img src="${item.image}" alt="${item.name}">${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    const shipping = 18.00; // Adjust based on your shipping logic
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').innerText = `$${shipping.toFixed(2)}`;
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(event) {
    const itemId = parseInt(event.target.getAttribute('data-id'));
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
    }
    updateCart();
}

document.addEventListener('DOMContentLoaded', updateCart);
