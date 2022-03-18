const userLS = localStorage.getItem('userList');

axios.defaults.baseURL = 'http://localhost:8080'

function validateUser() {
    const validate = {
        name: userLS
    }
    
    axios.post('/notes', validate)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        window.location.href = '/index.html';
    });
}

validateUser();