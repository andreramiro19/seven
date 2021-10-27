const db = firebase.firestore();
var storage = firebase.storage();

let btn = document.getElementById('upload-img');

btn.addEventListener('click', (e) => {
    let input = document.getElementById('select-img').files[0];
    console.log(input);

    const databaseRef = firebase.db().ref().child("loja");

    const storageRef = firebase.storage().ref(input.name);
    const task = storageRef.put(input);

  //  task.on (
  //      "state_changed",
  //      function progress(snapshot) {
  //          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  //          $("upload-progress").html(Math.round(percentage) + "%");
  //          $("upload-progress").attr("style", "width:" + percentage + "%");
  //      },
  //      function error(err) {
  //          console.log("Alguma coisa de errado aconteceu")
  //      },

  //      function complete() {
  //          task.snapshot.getDownloadURL().then( function(downloadImgUrl) {
  //              var itemData = {
  //                  "image": downloadImgUrl,
  //                  "name" : input.name
  //              }
  //          })
  //      }
  //  )

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        let body = document.getElementById("body");
        body.innerHTML += `
        <img src="${url} alt=""></img>"
        `

        db.collection("loja").add({
            Imagem: url,
        })

    })

})

function deleteButton (key) {
    var deleteRef = firebase.database().ref().child("loja").child(key);

    return deleteRef.remove()
    .then(function() {
        console.log("Removido com sucesso!")
    })
    .catch(function() {
        console.log("Error error error...")
    })
}
