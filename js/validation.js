const userLS = localStorage.getItem('userList');

axios.defaults.baseURL = 'https://scrapbook-api-miki.herokuapp.com'

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