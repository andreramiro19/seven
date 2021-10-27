firebase.auth.Auth.Persistence.LOCAL;

const btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', () => {
    var email = $("#email").val();
    var password = $('#password').val();
    console.log('teste')

    if(email != "" && password != "") {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
    else {
        window.alert("Please don't go")
    }
});



