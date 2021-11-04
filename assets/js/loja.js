/* ==================== show/hide catagory menu ==================== */
let catMenuHead = document.getElementById('category-menu-header');
let catMenuBody = document.getElementById('category-menu-body');

function myFunction(x) {
  if (x.matches) { // If media query matches
    catMenuBody.parentNode.removeChild(catMenuBody)
  } else {
    catMenuHead.parentNode.removeChild(catMenuHead)
  }
}

var x = window.matchMedia("(max-width: 992px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

/* ==================== Loja ==================== */
const db = firebase.firestore();
const shopList = document.querySelector('[data-js="shop-list"]');

db.collection('loja').onSnapshot(snapshot => {
    const shopLis = snapshot.docs.reduce((acc, doc) => {
        const { img, title, description, price } = doc.data()
        acc += `
        <li class="card" data-id="${doc.id}">
            <div class="swiper__card" id="swiper-card" data-id="${doc.id}">
                <div class="swiper__card__top" data-id="${doc.id}">
                    <img src=${img} class="swiper__card__img" data-id="${doc.id}"></img>
                </div>
                <div class="swiper__card__data" data-id="${doc.id}">
                    <div class="swiper__data__title" data-id="${doc.id}">${title}</div>
                    <div class="swiper__data__desc" data-id="${doc.id}">${description}</div>
                </div>
                <div class="swiper__card__price" data-id="${doc.id}">
                    <div class="swiper__price" data-id="${doc.id}">${price}</div>
                </div>
            </div>
        </li>`

        return acc
    }, '')

    shopList.innerHTML = shopLis

    const swiperCard = document.querySelectorAll('.card');
        swiperCard.forEach(btn => {
                btn.addEventListener('click', async (e) => {

                    const getTask2 = (id) => db.collection('loja').doc(id).get();

                    const doc = await getTask2(e.target.dataset.id);

                    const { title, description } = doc.data()

                    var pato = "Gostaria de comprar o " + title + description

                    window.open('https://wa.me/5535988911129?text=' + pato);
                    

                })
            });
    })

/* ==================== Categorias ==================== */
const categoryList = document.querySelector('[data-js="category-list"]');

db.collection('categories').onSnapshot(snapshot => {
    const categoryLis = snapshot.docs.reduce((acc, doc) => {
        const { title } = doc.data()
        acc += `<li data-id="${doc.id}">
        <button class="category__btn">${title}</button>
        </li>`

        return acc
    }, '')

    let button = document.getElementById

    categoryList.innerHTML = categoryLis
    })

categoryList.addEventListener('click', e => {
    const removeButtonId = e.target.innerHTML

    console.log(removeButtonId)

    db.collection('loja').where('category', '==', removeButtonId).onSnapshot(snapshot => {
        const shopLis = snapshot.docs.reduce((acc, doc) => {
            const { img, title, description, price } = doc.data()
            acc += `
            <li class="card" data-id="${doc.id}">
                <div class="swiper__card" data-id="${doc.id}">
                    <div class="swiper__card__top" data-id="${doc.id}">
                        <img src=${img} class="swiper__card__img" data-id="${doc.id}"></img>
                    </div>
                    <div class="swiper__card__data" data-id="${doc.id}">
                        <div class="swiper__data__title" data-id="${doc.id}">${title}</div>
                        <div class="swiper__data__desc" data-id="${doc.id}">${description}</div>
                    </div>
                    <div class="swiper__card__price" data-id="${doc.id}">
                        <div class="swiper__price" data-id="${doc.id}">${price}</div>
                    </div>
                </div>
            </li>`

            return acc
        }, '')
        shopList.innerHTML = shopLis

        const swiperCard = document.querySelectorAll('.card');
        swiperCard.forEach(btn => {
                btn.addEventListener('click', async (e) => {

                    const getTask2 = (id) => db.collection('loja').doc(id).get();

                    const doc = await getTask2(e.target.dataset.id);

                    const { title, description } = doc.data()

                    var pato = "Gostaria de comprar o " + title + description

                    window.open('https://wa.me/5535988911129?text=' + pato);
                    

                })
            });

        })    
})

const btnAll = document.getElementById('category__all');
btnAll.addEventListener('click', () => {
    db.collection('loja').onSnapshot(snapshot => {
        const shopLis = snapshot.docs.reduce((acc, doc) => {
            const { img, title, description, price } = doc.data()
            acc += `
            <li class="card" data-id="${doc.id}">
                <div class="swiper__card" data-id="${doc.id}">
                    <div class="swiper__card__top" data-id="${doc.id}">
                        <img src=${img} class="swiper__card__img" data-id="${doc.id}"></img>
                    </div>
                    <div class="swiper__card__data" data-id="${doc.id}">
                        <div class="swiper__data__title" data-id="${doc.id}">${title}</div>
                        <div class="swiper__data__desc" data-id="${doc.id}">${description}</div>
                    </div>
                    <div class="swiper__card__price" data-id="${doc.id}">
                        <div class="swiper__price" data-id="${doc.id}">${price}</div>
                    </div>
                </div>
            </li>`
    
            return acc
        }, '')
    
        shopList.innerHTML = shopLis

        const swiperCard = document.querySelectorAll('.card');
        swiperCard.forEach(btn => {
                btn.addEventListener('click', async (e) => {

                    const getTask2 = (id) => db.collection('loja').doc(id).get();

                    const doc = await getTask2(e.target.dataset.id);

                    const { title, description } = doc.data()

                    var pato = "Gostaria de comprar o " + title + description

                    window.open('https://wa.me/5535988911129?text=' + pato);

                })
            });
        })
})

