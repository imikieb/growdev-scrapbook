const username = document.getElementById('name');
const password = document.getElementById('password');
const table = document.getElementById('scroll-box');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');
const redirectButton = document.getElementById('redirect-button');
const errorFill = document.getElementById('error-fill');

let validate = true;

redirectButton.disabled = true;

axios.defaults.baseURL = 'http://localhost:8080';

function loginUser(event) {
    event.preventDefault();
    localStorage.setItem('userList', username.value);

    if(validate === true) {
        
        axios.post('/login', {
            name: username.value,
            password: password.value
        })
        .then(response => {
            errorFill.innerHTML = '';
            loginButton.style.display = 'none';
            redirectButton.style.display = 'block';
            setTimeout(() => window.location.href = '/notes.html', 3000);
        })
        .catch(error => {
            errorFill.style.display = 'block';
            errorFill.innerHTML = error.response.data.message;
        });
    }
}

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

function logout() {
    localStorage.setItem('userList', '');
    window.location.href = '/index.html';
}

async function addNote(event) {
    event.preventDefault();

    const noteInput = document.getElementById('note-input');
    const newItem = {
        note: noteInput.value
    }

    await axios.post(`/${userLS}/notes`, newItem)
    .then(response => {
        noteInput.value = '';
        errorFill.innerHTML = '';
        response.data;
    })
    .catch(error => {
        errorFill.style.display = 'block';
        errorFill.style.color = 'rgb(216, 38, 38)';
        errorFill.innerHTML = error.response.data.message;
    })

    showMessages();
}

async function deleteNote(id) {
    await axios.delete(`/${userLS}/notes/${id}`);
    showMessages();
}

async function editNote(id) {
    const edit = prompt('Edite a nota');
    
    const newNote = {
        note: edit
    }
    
    await axios.put(`/${userLS}/notes/${id}`, newNote);
    showMessages();
}

async function showMessages() {
    const userLS = localStorage.getItem('userList');
    
    await axios.get('/users')
    .then(response => {
        table.innerHTML = '';
        const errands = response.data.find(user => user.name === userLS).notes;
        errands.forEach(item => {
            table.innerHTML += 
            `
            <div class="note note-margin-top note-margin-bottom">
                <p>${item.note}</p>
                <div class="note-button-container margin-bottom">
                    <button class="note-button unselect" id="edit-button" draggable="false" onclick="editNote(${item.id})">Editar</button>
                    <button class="note-button unselect" draggable="false" onclick="deleteNote(${item.id})">Deletar</button>
                </div>
            </div>
            `
        });
    })
    .catch(error => {
        console.log(error);
    });
}

showMessages();