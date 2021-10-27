const db = firebase.firestore();
var storage = firebase.storage();

let btn = document.getElementById('upload-img');

let id = ''
const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback);
const deleteTask = id => db.collection('tasks').doc(id).delete();

btn.addEventListener('click', (e) => {
    let input = document.getElementById('select-img').files[0];
    console.log(input);

    const storageRef = firebase.storage().ref(input.name);
    const task = storageRef.put(input);

    const nome = document.getElementById('nome');
    const descricao = document.getElementById('descricao');
    const preco = document.getElementById('preco');

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        let body = document.getElementById("body");
        body.innerHTML += `<div>
        <img src="${url} alt=""></img>
        <h3>${nome.value}</h3>
        <p>${descricao.value}</p>
        <p>${preco.value}</p>
        <button class="btn-delete" data-id="${task.id}">Delete</button>
        <button class="btn-edit" data-id="${task.id}">Edit</button>
        </div>`;

        db.collection("loja").add({
            Imagem: url,
            Nome: nome.value,
            Descrição: descricao.value,
            Preço: preco.value
        })

        const btnsDelete = document.querySelectorAll('.btn-delete');
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    await deleteTask(e.target.dataset.id);
                })
            });

    })

})

