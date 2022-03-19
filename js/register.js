const username = document.getElementById('name');
const password = document.getElementById('password');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const redirectButton = document.getElementById('redirect-button');
const errorFill = document.getElementById('error-fill');

let validate = true;

redirectButton.disabled = true;

axios.defaults.baseURL = 'http://localhost:8080';

function registerUser(event) {
    event.preventDefault();

    const confirmPassword = document.getElementById('confirm-password');
    const newUser = {
        name: username.value,
        password: password.value
    }

    if(confirmPassword.value !== password.value) {
        validate = false;
        errorFill.style.display = 'block';
        errorFill.innerHTML = 'As senhas não coincidem.';
    }

    if(confirmPassword.value === password.value) {
        validate = true;
        errorFill.innerHTML = '';
    }

    if(validate === true) {
        axios.post('/register', newUser)
        .then(response => {
            errorFill.innerHTML = '';
            registerButton.style.display = 'none';
            redirectButton.style.display = 'block';
            setTimeout(() => window.location.href = '/index.html', 3000);
        })
        .catch(error => {
            errorFill.style.display = 'block';
            errorFill.innerHTML = error.response.data.message;
        });
    }
}