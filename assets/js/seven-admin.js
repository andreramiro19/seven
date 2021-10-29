/* ============================================================ OFERTAS ============================================================ */
const db = firebase.firestore();
var storage = firebase.storage();
var auth = firebase.auth();

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = ''

let btnImage = document.getElementById('select-img');
let file = document.getElementById('file-img')
// let btn = document.getElementById('file2');

btnImage.addEventListener('click', () => {
    file.click();
})

btnImage.addEventListener('change', (e) => {
    let input = document.getElementById('file-img').files[0];
    console.log(input);

    const storageRef = firebase.storage().ref(input.name + new Date);
    const task = storageRef.put(input);

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        let nada = document.getElementById("imagem-url");
        nada.value = url;
        
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
    console.log('click_ofertas')
}

const saveTask = (img, title, description, price) => 
    db.collection('ofertas').doc().set( {
        img,
        title,
        description,
        price
    })

const getTasks = () => db.collection('ofertas').get();

const getTask = (id) => db.collection('ofertas').doc(id).get();

const onGetTasks = (callback) => db.collection('ofertas').onSnapshot(callback);

const deleteTask = id => db.collection('ofertas').doc(id).delete();

const updateTask = (id, updatedTask) => db.collection('ofertas').doc(id).update(updatedTask);



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
                    var docRef = db.collection("ofertas").doc(idid);

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
                    taskForm['btn-task-form'].innerText = 'Atualizar'

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
    
})

/* ============================================================ LOJA ============================================================ */

const taskForm2 = document.getElementById('task-form2');
const taskContainer2 = document.getElementById('tasks-container2');

let editStatus2 = false;

let btnImage2 = document.getElementById('select-img2');
let file2 = document.getElementById('file-img2')

btnImage2.addEventListener('click', () => {
    file2.click();
})

btnImage2.addEventListener('change', (e) => {
    let input = document.getElementById('file-img2').files[0];
    console.log(input);

    const storageRef = firebase.storage().ref(input.name + new Date);
    const task = storageRef.put(input);

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload sucessfull!")
        
        let nada2 = document.getElementById("imagem-url2");
        nada2.value = url;
        
    })

})

function previewImage2() {
    var file = document.getElementById("file-img2").files;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            document.getElementById("task-image2").setAttribute("src", event.target.result);
            document.getElementById("task-image2").style.width="100%";
        };

        fileReader.readAsDataURL(file[0]);
    }
    console.log('click_loja')
}

const saveTask2 = (img, title, description, category, price) => 
    db.collection('loja').doc().set( {
        img,
        title,
        description,
        category,
        price
    })

const getTasks2 = () => db.collection('loja').get();

const getTask2 = (id) => db.collection('loja').doc(id).get();

const onGetTasks2 = (callback) => db.collection('loja').onSnapshot(callback);

const deleteTask2 = id => db.collection('loja').doc(id).delete();

const updateTask2 = (id, updatedTask) => db.collection('loja').doc(id).update(updatedTask);

window.addEventListener('DOMContentLoaded', async (e) => {

    onGetTasks2((querySnapshot) => {
        taskContainer2.innerHTML = ''
        querySnapshot.forEach((doc) => {
    
            const task = doc.data();
            task.id = doc.id;
    
            taskContainer2.innerHTML += `<tr class="tr">
            <div class="task__card">
            <div class="task__img">
            <img class="tk__img" src="${task.img}"></img>
            </div>
            <div class="task__data">
            <h3 class="tk__title">${task.title}</h3>
            <p class="tk__desc">${task.description}</p>
            <p class="tk__category"">${task.category}</p>
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
                                    deleteTask2(e.target.dataset.id);
                                }).catch(function (error) {
                                    // Some Error occurred
                                    
                                });

                                
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            deleteTask2(e.target.dataset.id);
                        }

                    }).catch((error) => {
                        console.log("Error getting document:", error);
                        deleteTask2(e.target.dataset.id);
                    });
                                     
                })
  
            });

            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask2(e.target.dataset.id);
                    const task = doc.data();

                    editStatus2 = true;
                    id = doc.id;

                    taskForm2['task-title2'].value = task.title;
                    taskForm2['task-description2'].value = task.description;
                    taskForm2['task-price2'].value = task.price;
                    taskForm2['select-cat'].value = task.category;
                    taskForm2['btn-task-form2'].innerText = 'Atualizar'

                })
            });

        })
    })
})

taskForm2.addEventListener('submit', async (e) => {
    e.preventDefault();

    //const img = taskForm2['task-image'];
    const img = document.getElementById("imagem-url2");
    //const img = taskForm2['imagem-url'];
    const title = taskForm2['task-title2'];
    const description = taskForm2['task-description2'];
    const price = taskForm2['task-price2'];
    const category = taskForm2['select-cat'];

    if (!editStatus2) {
        await saveTask2(img.value, title.value, description.value, category.value, price.value);
        console.log("Estamos aqui !editStatus2")
    }
    else {
        await updateTask2(id, {
            title: title.value,
            description: description.value,
            category: category.value,
            price: price.value
        });

        editStatus2 = false;
        id = '';
        taskForm2['btn-task-form2'].innerText = 'Salvar';
    }

    await getTasks2();

    taskForm2.reset();
    title.focus();
    // location.reload();
})


/* ============================== Categorias ============================== */
const gamesList = document.querySelector('[data-js="games-list"]');
const formAddGame = document.querySelector('[data-js="add-game-form"]')

db.collection('categories').onSnapshot(snapshot => {
    const gamesLis = snapshot.docs.reduce((acc, doc) => {
        const { title } = doc.data()
        acc += `<li data-id="${doc.id}">
        <h5>${title}</h5>
        <button data-remove="${doc.id}">Deletar</button>
        </li>`

        return acc
    }, '')

    gamesList.innerHTML = gamesLis
    })

formAddGame.addEventListener('submit', e => {
    e.preventDefault()

    db.collection('categories').add({
        title: e.target.title.value
    })
    .then(() => {
        console.log('Categoria adicionada')
    })
    .catch(e => {
        console.log('Categoria não adicionada', e.message)
    })

    formAddGame.reset();
})

gamesList.addEventListener('click', e => {
    const removeButtonId = e.target.dataset.remove

    if (removeButtonId) {
        db.collection('categories').doc(removeButtonId).delete()
            .then(() => {
                console.log("Categoria removida")
            })
            .catch(e => {
                console.log("Erro ao remover a categoria: ", e.message)
            })
        
    }
})

const listBox = document.querySelector('[data-js="list-box"]');

db.collection('categories').onSnapshot(snapshot => {
    const boxLis = snapshot.docs.reduce((acc, doc) => {
        const { title } = doc.data()
        acc += `<li data-id="${doc.id}">
        <option id='bob'>${title}</option>
        </li>`

        return acc
    }, '')

    listBox.innerHTML = boxLis
    })

const listBox2 = document.querySelector('[data-js="list-box2"]');

db.collection('categories').onSnapshot(snapshot => {
    const boxLis = snapshot.docs.reduce((acc, doc) => {
        const { title } = doc.data()
        acc += `<li data-id="${doc.id}">
        <option id='bob'>${title}</option>
        </li>`

        return acc
    }, '')

    listBox2.innerHTML = boxLis
    })







const botao = document.getElementById('loja__cat');

botao.addEventListener('change', () => {

    db.collection('loja').where('category', '==', listBox2.value).onSnapshot(snapshot => {
        const boxLis = snapshot.docs.reduce((acc, doc) => {
            const { img, title, description, category, price, id } = doc.data()
            acc += `<tr class="tr">
            <div class="task__card">
            <div class="task__img">
            <img class="tk__img" src="${img}"></img>
            </div>
            <div class="task__data">
            <h3 class="tk__title">${title}</h3>
            <p class="tk__desc">${description}</p>
            <p class="tk__category"">${category}</p>
            <p class="tk__price">${price}</p>
            </div>
            <div class="task__btns">
            <button class="btn-edit" data-id="${doc.id}">Editar</button>
            <button class="btn-delete" data-id="${doc.id}">Deletar</button>
            </div>
            </div>
            </tr>`;
    
            return acc
        }, '')
        taskContainer2.innerHTML = boxLis

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
                                    deleteTask2(e.target.dataset.id);
                                }).catch(function (error) {
                                    // Some Error occurred
                                    
                                });

                                
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            deleteTask2(e.target.dataset.id);
                        }

                    }).catch((error) => {
                        console.log("Error getting document:", error);
                        deleteTask2(e.target.dataset.id);
                    });
                                     
                })
  
            });

            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask2(e.target.dataset.id);
                    const task = doc.data();

                    editStatus2 = true;
                    id = doc.id;

                    taskForm2['task-title2'].value = task.title;
                    taskForm2['task-description2'].value = task.description;
                    taskForm2['task-price2'].value = task.price;
                    taskForm2['select-cat'].value = task.category;
                    taskForm2['btn-task-form2'].innerText = 'Atualizar'

                })
            });
        })    
})

const botao2 = document.getElementById('botao2');

botao2.addEventListener('click', () => {
    console.log('clicou')

    db.collection('loja').onSnapshot(snapshot => {
        const boxLis = snapshot.docs.reduce((acc, doc) => {
            const { img, title, description, category, price, id } = doc.data()
            acc += `<tr class="tr">
            <div class="task__card">
            <div class="task__img">
            <img class="tk__img" src="${img}"></img>
            </div>
            <div class="task__data">
            <h3 class="tk__title">${title}</h3>
            <p class="tk__desc">${description}</p>
            <p class="tk__category"">${category}</p>
            <p class="tk__price">${price}</p>
            </div>
            <div class="task__btns">
            <button class="btn-edit" data-id="${doc.id}">Editar</button>
            <button class="btn-delete" data-id="${doc.id}">Deletar</button>
            </div>
            </div>
            </tr>`;
    
            return acc
        }, '')
        taskContainer2.innerHTML = boxLis

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
                                    deleteTask2(e.target.dataset.id);
                                }).catch(function (error) {
                                    // Some Error occurred
                                    
                                });

                                
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                            deleteTask2(e.target.dataset.id);
                        }

                    }).catch((error) => {
                        console.log("Error getting document:", error);
                        deleteTask2(e.target.dataset.id);
                    });
                                     
                })
  
            });

            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask2(e.target.dataset.id);
                    const task = doc.data();

                    editStatus2 = true;
                    id = doc.id;

                    taskForm2['task-title2'].value = task.title;
                    taskForm2['task-description2'].value = task.description;
                    taskForm2['task-price2'].value = task.price;
                    taskForm2['select-cat'].value = task.category;
                    taskForm2['btn-task-form2'].innerText = 'Atualizar'

                })
            });
        })
})

// const botao = document.getElementById('botao');

// botao.addEventListener('click', () => {

// const onGetTasks2 = (callback) => db.collection('loja').where('category', '==', listBox2.value).onSnapshot(callback);

// window.addEventListener('DOMContentLoaded', async (e) => {

//     onGetTasks2((querySnapshot) => {
//         taskContainer2.innerHTML = ''
//         querySnapshot.forEach((doc) => {
    
//             const task = doc.data();
//             task.id = doc.id;
    
//             taskContainer2.innerHTML += `<tr class="tr">
//             <div class="task__card">
//             <div class="task__img">
//             <img class="tk__img" src="${task.img}"></img>
//             </div>
//             <div class="task__data">
//             <h3 class="tk__title">${task.title}</h3>
//             <p class="tk__desc">${task.description}</p>
//             <p class="tk__category"">${task.category}</p>
//             <p class="tk__price">${task.price}</p>
//             </div>
//             <div class="task__btns">
//             <button class="btn-edit" data-id="${task.id}">Editar</button>
//             <button class="btn-delete" data-id="${task.id}">Deletar</button>
//             </div>
//             </div>
//             </tr>`;

//             const btnsDelete = document.querySelectorAll('.btn-delete');
//             btnsDelete.forEach(btn => {
//                 btn.addEventListener('click', async (e) => {
//                     var idid = e.target.dataset.id
//                     var docRef = db.collection("loja").doc(idid);

//                     docRef.get().then((doc) => {
//                         if (doc.exists) {
//                             var data = doc.data();
//                             var porco = data.img;
//                             console.log("A URL DA IMAGEM É: " + porco);

//                             var fileUrl = porco;
            
//                             var storage = firebase.storage();
//                                 // Create a reference to the file to delete
//                                 var fileRef = storage.refFromURL(fileUrl);        
                                
//                                 // Delete the file using the delete() method 
//                                 fileRef.delete().then(function () {
                                
//                                     // File deleted successfully
//                                     console.log("File Deleted")
//                                     deleteTask2(e.target.dataset.id);
//                                 }).catch(function (error) {
//                                     // Some Error occurred
                                    
//                                 });

                                
//                         } else {
//                             // doc.data() will be undefined in this case
//                             console.log("No such document!");
//                             deleteTask2(e.target.dataset.id);
//                         }

//                     }).catch((error) => {
//                         console.log("Error getting document:", error);
//                         deleteTask2(e.target.dataset.id);
//                     });
                                     
//                 })
  
//             });

//             const btnsEdit = document.querySelectorAll('.btn-edit');
//             btnsEdit.forEach(btn => {
//                 btn.addEventListener('click', async (e) => {
//                     const doc = await getTask2(e.target.dataset.id);
//                     const task = doc.data();

//                     editStatus2 = true;
//                     id = doc.id;

//                     taskForm2['task-title2'].value = task.title;
//                     taskForm2['task-description2'].value = task.description;
//                     taskForm2['task-price2'].value = task.price;
//                     taskForm2['select-cat'].value = task.category;
//                     taskForm2['btn-task-form2'].innerText = 'Atualizar'

//                 })
//             });

//         })
//     })
// })
//     console.log('nao deu')
// })