const db = firebase.firestore();
var storage = firebase.storage();
var auth = firebase.auth();

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = ''

let btnImage = document.getElementById('select-img');
let file = document.getElementById('file-img')
let btn = document.getElementById('file2');

btnImage.addEventListener('click', () => {
    file.click();
})
//let btnLogout = document.getElementById('btn-logout')


// btnLogout.addEventListener('click', () => {

//     firebase.auth().signOut().then(() => {
//         // Sign-out successful.
//         alert("você se deslogou")
//         window.location.href = "sv-admin.html"
//       }).catch((error) => {
//         // An error happened.
//       });

// });

// btnImage.addEventListener('change', (e) => {
//     let input = document.getElementById('file-img').files[0];
//     console.log(input);
//     console.log("NADA")

//     const storageRef = firebase.storage().ref(input.name);
//     const task = storageRef.put(input);

//     task
//     .then(snapshot => snapshot.ref.getDownloadURL())
//     .then(url => {
//         console.log(url)
//         alert("Image upload sucessfull!")
        
//         let nada3 = document.getElementById("task-image2").src;
//         let nada = document.getElementById("imagem-url");
//         nada.value = url;

//         nada3.value = url;
        
//     })

// })


btnImage.addEventListener('change', (e) => {
    let input = document.getElementById('file-img').files[0];
    console.log(input);

    const storageRef = firebase.storage().ref(input.name);
    const task = storageRef.put(input);

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        // let nada2 = document.getElementById("task-image2").src;
        let nada = document.getElementById("imagem-url");
        nada.value = url;

        // nada2 = url;
        
    })

})

function previewImage() {
    var file = document.getElementById("file-img").files;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            document.getElementById("task-image").setAttribute("src", event.target.result);
            document.getElementById("task-image").style.width="100%";
        };

        fileReader.readAsDataURL(file[0]);
    }
}
// let input4 = document.getElementById('imagem-url');
// input4.addEventListener('onchange', () => {
//     console.log("NADA2");
// })


const saveTask = (img, title, description, price) => 
    db.collection('loja').doc().set( {
        img,
        title,
        description,
        price
    })

const getTasks = () => db.collection('loja').get();

const getTask = (id) => db.collection('loja').doc(id).get();

const onGetTasks = (callback) => db.collection('loja').onSnapshot(callback);

const deleteTask = id => db.collection('loja').doc(id).delete();

const updateTask = (id, updatedTask) => db.collection('loja').doc(id).update(updatedTask);

window.addEventListener('DOMContentLoaded', async (e) => {

    onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = ''
        querySnapshot.forEach((doc) => {
    
            const task = doc.data();
            task.id = doc.id;
    
            taskContainer.innerHTML += `<tr class="tr">
            <div class="task__card">
            <div class="task__img">
            <img class="tk__img" src="${task.img}"></img>
            </div>
            <div class="task__data">
            <h3 class="tk__title">${task.title}</h3>
            <p class="tk__desc">${task.description}</p>
            <p class="tk__price">${task.price}</p>
            </div>
            <div class="task__btns">
            <button class="btn-edit" data-id="${task.id}">Editar</button>
            <button class="btn-delete" data-id="${task.id}">Deletar</button>
            </div>
            </div>
            </tr>`;

            const btnsDelete = document.querySelectorAll('.btn-delete');
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    var idid = e.target.dataset.id
                    var docRef = db.collection("loja").doc(idid);

                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            var data = doc.data();
                            var porco = data.img;
                            console.log("A URL DA IMAGEM É: " + porco);

                            var fileUrl = porco;
            
                            var storage = firebase.storage();
                                // Create a reference to the file to delete
                                var fileRef = storage.refFromURL(fileUrl);        
                                
                                // Delete the file using the delete() method 
                                fileRef.delete().then(function () {
                                
                                    // File deleted successfully
                                    console.log("File Deleted")
                                    deleteTask(e.target.dataset.id);
                                }).catch(function (error) {
                                    // Some Error occurred
                                    
                                });

                                
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            deleteTask(e.target.dataset.id);
                        }

                    }).catch((error) => {
                        console.log("Error getting document:", error);
                        deleteTask(e.target.dataset.id);
                    });
                                     
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

    //const img = taskForm['task-image'];
    const img = document.getElementById("imagem-url");
    //const img = taskForm['imagem-url'];
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    const price = taskForm['task-price'];

    if (!editStatus) {
        await saveTask(img.value, title.value, description.value, price.value);
        console.log("Estamos aqui !editStatus")
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
    location.reload();
})