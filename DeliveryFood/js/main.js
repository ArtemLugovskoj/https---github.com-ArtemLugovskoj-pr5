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
    document.body.style.overflow = 'hidden'; // Прибираємо скролбар
}

function closeAuthModal() {
    modalAuth.style.display = 'none';
    document.body.style.overflow = ''; // Повертаємо скролбар
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

// Закриття модального вікна при кліку поза його межами
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
});