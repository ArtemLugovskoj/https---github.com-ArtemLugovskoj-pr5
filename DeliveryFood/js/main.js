const authButton = document.querySelector('.button-auth');
const outButton = document.querySelector('.button-out');
const userNameSpan = document.getElementById('user-name');
const modalAuth = document.querySelector('.modal-auth');
const closeAuthButton = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const buttonLogin = document.querySelector('.button-login');
const loginErrorText = document.getElementById('login-error');
const passwordErrorText = document.getElementById('password-error');
const authErrorText = document.getElementById('auth-error');

const cardsRestaurants = document.querySelector('.cards-restaurants');

const restaurantData = [
    {
        image: 'img/pizza-plus/preview.jpg',
        title: 'Піца плюс',
        time: '50 хвилин',
        rating: '4.5',
        price: 'від 200 &#8372;',
        category: 'Піца',
        link: 'restaurant.html'
    },
    {
        image: 'img/tanuki/preview.jpg',
        title: 'Танукі',
        time: '60 хвилин',
        rating: '4.5',
        price: 'від 1 200 &#8372;',
        category: 'Суші, роли',
        link: 'restaurant.html'
    },
    {
        image: 'img/food-band/preview.jpg',
        title: 'FoodBand',
        time: '40 хвилин',
        rating: '4.5',
        price: 'від 150 &#8372;',
        category: 'Піца',
        link: 'restaurant.html'
    },
    {
        image: 'img/palki-skalki/preview.jpg',
        title: 'Ikigai',
        time: '55 хвилин',
        rating: '4.5',
        price: 'від 250 &#8372;',
        category: 'Піца',
        link: 'restaurant.html'
    },
    {
        image: 'img/gusi-lebedi/preview.jpg',
        title: 'Пузата хата',
        time: '75 хвилин',
        rating: '4.5',
        price: 'від 300 &#8372;',
        category: 'Українські страви',
        link: 'restaurant.html'
    },
    {
        image: 'img/pizza-burger/preview.jpg',
        title: 'PizzaBurger',
        time: '45 хвилин',
        rating: '4.5',
        price: 'від 700 &#8372;',
        category: 'Піца',
        link: 'restaurant.html'
    }
];

function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function removeUser() {
    localStorage.removeItem('user');
}

function updateUI(user) {
    if (user) {
        userNameSpan.textContent = `Привіт, ${user.login}`;
        userNameSpan.style.display = 'inline';
        authButton.style.display = 'none';
        outButton.style.display = 'inline-block'; 
    } else {
        userNameSpan.textContent = '';
        userNameSpan.style.display = 'none';
        authButton.style.display = 'inline-block';
        outButton.style.display = 'none';  
    }
}

function openAuthModal() {
    modalAuth.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeAuthModal() {
    modalAuth.style.display = 'none';
    document.body.style.overflow = ''; 
    resetForm();
}

function updateButtonState() {
    const isLoginFilled = loginInput.value.trim() !== '';
    const isPasswordFilled = passwordInput.value.trim() !== '';
    
    loginErrorText.style.display = isLoginFilled ? 'none' : 'block';
    passwordErrorText.style.display = isPasswordFilled ? 'none' : 'block';
    
    if (!isLoginFilled) {
        loginInput.classList.add('input-error');
    } else {
        loginInput.classList.remove('input-error');
    }
    
    if (!isPasswordFilled) {
        passwordInput.classList.add('input-error');
    } else {
        passwordInput.classList.remove('input-error');
    }
    
    buttonLogin.disabled = !(isLoginFilled && isPasswordFilled);
    
    authErrorText.style.display = 'none';
}

function resetForm() {
    loginInput.value = '';
    passwordInput.value = '';
    loginErrorText.style.display = 'none';
    passwordErrorText.style.display = 'none';
    authErrorText.style.display = 'none';
    buttonLogin.disabled = true;
    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
}

function renderRestaurants() {
    cardsRestaurants.innerHTML = '';

    restaurantData.forEach(restaurant => {
        const { image, title, time, rating, price, category, link } = restaurant;

        const a = document.createElement('a');
        a.href = link;
        a.classList.add('card', 'card-restaurant');

        a.innerHTML = `
            <img src="${image}" alt="${title}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${title}</h3>
                    <span class="card-tag tag">${time}</span>
                </div>
                <div class="card-info">
                    <div class="rating">${rating}</div>
                    <div class="price">${price}</div>
                    <div class="category">${category}</div>
                </div>
            </div>
        `;

        a.addEventListener('click', function(event) {
            const user = getUser();
            if (!user) {
                event.preventDefault(); 
                openAuthModal(); 
            }
        });

        cardsRestaurants.appendChild(a);
    });
}

logInForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (login === 'Artem' && password === '12345') {
        const user = { login };
        saveUser(user);
        updateUI(user);  
        closeAuthModal(); 
        resetForm();
    } else {
        authErrorText.style.display = 'block';
    }
});

loginInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);

authButton.addEventListener('click', openAuthModal);

closeAuthButton.addEventListener('click', closeAuthModal);

modalAuth.addEventListener('click', function(event) {
    if (event.target === modalAuth) {
        closeAuthModal();
    }
});

outButton.addEventListener('click', function () {
    removeUser();
    updateUI(null);
    closeAuthModal();
    resetForm(); 
});

document.addEventListener('DOMContentLoaded', function () {
    const user = getUser();
    updateUI(user);
    resetForm(); 

    renderRestaurants();
});