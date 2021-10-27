const db = firebase.firestore();
var storage = firebase.storage();

let btn = document.getElementById('upload-img');

btn.addEventListener('click', (e) => {
    let input = document.getElementById('select-img').files[0];
    console.log(input);

    const databaseRef = firebase.db().ref().child("loja");

    const storageRef = firebase.storage().ref(input.name);
    const task = storageRef.put(input);

    const saveTask = (imgUrlMaster) => 
    db.collection('loja').doc().set( {
        url
    })


    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        let body = document.getElementById("body");
        body.innerHTML += `
        <img src="${url} alt=""></img>"
        `

        saveTask(url.value);

    })

})
