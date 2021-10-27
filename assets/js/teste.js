const db = firebase.firestore();
var storage = firebase.storage();

let profileView = document.getElementById('profile-view'),
    signupView = document.getElementById('signup-view'),
    email = document.getElementById('email'),
    pword = document.getElementById('pword'),
    img = document.getElementById('img');

let file = {};

function chooseFile(e) {
    file = e.target.files[0];
}

function signUpButtonPressed() {
    firebase.storage().ref('users/profile.jpg').put(file).then(function() {
        console.log('successfully uploaded')
    }).catch(error => {
        console.log(error.message);
    })
}

firebase.storage().ref('users/profile.jpg').getDownloadURL().then(imgUrl => {
    img.src = imgUrl;
})