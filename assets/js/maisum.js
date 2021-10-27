const db = firebase.firestore();
var storage = firebase.storage();

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = ''















let btn = document.getElementById('upload-img');

btn.addEventListener('click', (e) => {
    let input = document.getElementById('select-img').files[0];
    console.log(input);

    const storageRef = firebase.storage().ref("loja");
    const task = storageRef.put(input);

    const nome = document.getElementById('nome');
    const descricao = document.getElementById('descricao');
    const preco = document.getElementById('preco');

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        let nada = document.getElementById("imagem-url");
        //let nada2 = document.getElementById("imagem-url2")

        //nada2.src = url;
        nada.innerHTML = url;
        console.log("nao aguento mais")
        
    })

})















const saveTask = (title, description, price) => 
    db.collection('tasks').doc().set( {
        title,
        description,
        price
    })

const getTasks = () => db.collection('tasks').get();

const getTask = (id) => db.collection('tasks').doc(id).get();

const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback);

const deleteTask = id => db.collection('tasks').doc(id).delete();

const updateTask = (id, updatedTask) => db.collection('tasks').doc(id).update(updatedTask);

window.addEventListener('DOMContentLoaded', async (e) => {

    onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = ''
        querySnapshot.forEach((doc) => {
    
            const task = doc.data();
            task.id = doc.id;

            let chico = document.getElementById("imagem-url").innerHTML
    
            taskContainer.innerHTML += `<div>
            <img src="${chico}"></img>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>${task.price}</p>
            <button class="btn-delete" data-id="${task.id}">Delete</button>
            <button class="btn-edit" data-id="${task.id}">Edit</button>
            </div>`;

            const btnsDelete = document.querySelectorAll('.btn-delete');
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    await deleteTask(e.target.dataset.id);
                })
            });

            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();

                    editStatus = true;
                    id = doc.id;

                    taskForm['task-title'].value = task.title;
                    taskForm['task-description'].value = task.description;
                    taskForm['task-price'].value = task.price;
                    taskForm['btn-task-form'].innerText = 'Update'

                })
            });

        })
    })
    
})

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    const price = taskForm['task-price'];

    if (!editStatus) {
        await saveTask(title.value, description.value, price.value);
    }
    else {
        await updateTask(id, {
            title: title.value,
            description: description.value,
            price: price.value
        });

        editStatus = false;
        id = '';
        taskForm['btn-task-form'].innerText = 'Save';
    }

    await getTasks();

    taskForm.reset();
    title.focus();
})