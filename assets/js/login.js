var btnLogin = document.getElementById('btn-login');
const email = document.getElementById('email');
const password = document.getElementById('password');

firebase.auth.Auth.Persistence.LOCAL;

btnLogin.addEventListener('click', () => {

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
        console.log(result);
        alert("Usuário Conectado: " + email.value);
        // Signed in
        //window.location.replace("seven-admin.html");
                
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Email ou senha inválida")
    });
})