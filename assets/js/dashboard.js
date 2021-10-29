// MenuToggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = () => {
    navigation.classList.toggle('active')
    main.classList.toggle('active')
}

// Search Input

let searchInput = document.getElementById("search-input");
searchInput.addEventListener('keyup', () => {
    let searchValue = document.getElementById("search-input").value;
    var taskContainer = document.getElementById('tasks-container');
    let tr = taskContainer.querySelectorAll('tr');

    for (let i = 0; i < tr.length; i++) {
        let val = tr[i].getElementsByTagName('h3')[0];
        if(val.innerHTML.indexOf(searchValue) > -1) {
            tr[i].style.display = ''
            console.log('nao deu certo11')
        }
        else {
            tr[i].style.display='none'
            console.log('nao deu certo22')
        }
    }

    console.log(1);
})

// Add hovered class in selected list item
let list = document.querySelectorAll('.navigation li');

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('hovered'));
        this.classList.add('hovered');
    };

    list.forEach((item) => {
        item.addEventListener('mouseover', activeLink)
    })


// Ofertas
let btnOfertas = document.getElementById('btn-ofertas');

btnOfertas.addEventListener('click', () => {
    console.log('Clicou ofertas')
    document.getElementById("section-ofertas").style.display = "block";
    document.getElementById("section-loja").style.display = "none";
    document.getElementById("section-categorias").style.display = "none";
})

// Loja
let btnLoja = document.getElementById('btn-loja');

btnLoja.addEventListener('click', () => {
    console.log('Clicou loja')
    document.getElementById("section-loja").style.display = "block";
    document.getElementById("section-ofertas").style.display = "none";
    document.getElementById("section-categorias").style.display = "none";
})

// Categorias
let btnCategorias = document.getElementById('btn-categorias');

btnCategorias.addEventListener('click', () => {
    console.log('Clicou Categorias')
    document.getElementById("section-ofertas").style.display = "none";
    document.getElementById("section-loja").style.display = "none";
    document.getElementById("section-categorias").style.display = "block";
})

// Logout
let btnLogout = document.getElementById('btn-logout');

btnLogout.addEventListener('click', () => {
    console.log("Clicou")

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("você se deslogou")
        window.location.href = "sv-admin.html"
        }).catch((error) => {
        // An error happened.
        });

});