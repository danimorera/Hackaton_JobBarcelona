const url = 'http://localhost:8080/api/auth/';


const registerForm = document.querySelector('form');

registerForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const registerData = {};

    for (let element of registerForm.elements) {
        if (element.name.length > 0) {
            registerData[element.name] = element.value
        };
    };

    fetch(url + 'register', {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(({ msg, user, token }) => {
            if (msg) {
                return console.error(msg);
            };
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('username', user.name)
                
            alert("Thanks for your data!")
            window.location = "index.html"
        })
        .catch(e => {
            console.log(e);
        });
});