const db = firebase.firestore();
var storage = firebase.storage();

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = ''

const saveTask = (title, description, price) => 
    db.collection('loja').doc().set( {
        title,
        description,
        price
    })

const getTasks = () => db.collection('loja').get();

const getTask = (id) => db.collection('loja').doc(id).get();

const onGetTasks = (callback) => db.collection('loja').onSnapshot(callback);

const deleteTask = id => db.collection('loja').doc(id).delete();

const updateTask = (id, updatedTask) => db.collection('loja').doc(id).update(updatedTask);







let btn = document.getElementById('upload-img');

btn.addEventListener('click', (e) => {
    let input = document.getElementById('select-img').files[0];
    console.log(input);


    const storageRef = firebase.storage().ref(input.name);
    const task = storageRef.put(input);

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        let body = document.getElementById("body");
        body.innerHTML += `
        <img src="${url} alt=""></img>
        `

        db.collection("loja").add({
            Imagem: url,
        })

        imgUltimateUrl = url;
    })

})













window.addEventListener('DOMContentLoaded', async (e) => {

    onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = ''
        querySnapshot.forEach((doc) => {








                
                //let body = document.getElementById("body");
                //body.innerHTML += `
                //<img src="${url} alt=""></img>"
                //`

                //db.collection("loja").add({
                //    Imagem: url,
                //})

            







    
            const task = doc.data();
            task.id = doc.id;
    
            taskContainer.innerHTML += `<div>  
            <img src="${imgUltimateUrl} alt=""></img>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>${task.price}</p>
            <button class="btn-delete" data-id="${task.id}">Delete</button>
            <button class="btn-edit" data-id="${task.id}">Edit</button>
            </div>`;

        })

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