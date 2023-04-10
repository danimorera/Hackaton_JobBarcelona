
const url = 'http://localhost:8080/api/auth/';


const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const loginData = {};

    for (let element of loginForm.elements) {
        if (element.name.length > 0) {
            loginData[element.name] = element.value
        };
    };


    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(({ msg, token, user }) => {
            if (msg) {
                return console.error(msg);
            };

            const { room } = loginData
            sessionStorage.clear();
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('username', user.name);
            sessionStorage.setItem('room', room);

            window.location = 'chat.html';
        })
        .catch(e => {
            console.log(e);
        });
});


function handleCredentialResponse(response) {
    const body = { id_token: response.credential };
    fetch(url + 'google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(({ token, user }) => {

            sessionStorage.clear();
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('username', user.name)

            //window.location = 'chat.html';
        })
        .catch(e => {
            console.log(e);
        });
};

const button = document.getElementById('google_signout');

button.onclick = async () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(sessionStorage.getItem('email'), done => {
        sessionStorage.clear();
        location.reload();
    });
};