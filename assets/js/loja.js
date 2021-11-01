const db = firebase.firestore();
const shopList = document.querySelector('[data-js="shop-list"]');

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
db.collection('loja').onSnapshot(snapshot => {
    const shopLis = snapshot.docs.reduce((acc, doc) => {
        const { img, title, description, price } = doc.data()
        acc += `
        <li data-id="${doc.id}">
            <div class="swiper__card">
                <div class="swiper__card__top">
                    <img src=${img} class="swiper__card__img"></img>
                </div>
                <div class="swiper__card__data">
                    <div class="swiper__data__title">${title}</div>
                    <div class="swiper__data__desc">${description}</div>
                </div>
                <div class="swiper__card__price">
                    <div class="swiper__price">${price}</div>
                </div>
            </div>
        </li>`

        return acc
    }, '')

    shopList.innerHTML = shopLis
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
            <li data-id="${doc.id}">
                <div class="swiper__card">
                    <div class="swiper__card__top">
                        <img src=${img} class="swiper__card__img"></img>
                    </div>
                    <div class="swiper__card__data">
                        <div class="swiper__data__title">${title}</div>
                        <div class="swiper__data__desc">${description}</div>
                    </div>
                    <div class="swiper__card__price">
                        <div class="swiper__price">${price}</div>
                    </div>
                </div>
            </li>`

            return acc
        }, '')
        shopList.innerHTML = shopLis

        })    
})

const btnAll = document.getElementById('category__all');
btnAll.addEventListener('click', () => {
    db.collection('loja').onSnapshot(snapshot => {
        const shopLis = snapshot.docs.reduce((acc, doc) => {
            const { img, title, description, price } = doc.data()
            acc += `
            <li data-id="${doc.id}">
                <div class="swiper__card">
                    <div class="swiper__card__top">
                        <img src=${img} class="swiper__card__img"></img>
                    </div>
                    <div class="swiper__card__data">
                        <div class="swiper__data__title">${title}</div>
                        <div class="swiper__data__desc">${description}</div>
                    </div>
                    <div class="swiper__card__price">
                        <div class="swiper__price">${price}</div>
                    </div>
                </div>
            </li>`
    
            return acc
        }, '')
    
        shopList.innerHTML = shopLis
        })
})

