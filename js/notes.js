const errorFill = document.getElementById('error-fill');

let validate = true;

axios.defaults.baseURL = 'http://localhost:8080';

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

async function showMessages() {
    const table = document.getElementById('scroll-box');
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

async function editNote(id) {
    const edit = prompt('Edite a nota:');
    const newNote = {
        note: edit
    }

    if(!edit) {
        return;
    }

    if(edit.length > 56) {
        return alert('O campo não deve conter mais que 56 caracteres.');
    }

    await axios.put(`/${userLS}/notes/${id}`, newNote);

    showMessages();
}

async function deleteNote(id) {
    await axios.delete(`/${userLS}/notes/${id}`);

    showMessages();
}