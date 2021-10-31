const db = firebase.firestore();
const shopList = document.querySelector('[data-js="shop-list"]');

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

const categoryList = document.querySelector('[data-js="category-list"]');

db.collection('categories').onSnapshot(snapshot => {
    const categoryLis = snapshot.docs.reduce((acc, doc) => {
        const { title } = doc.data()
        acc += `<li data-id="${doc.id}" class="category__btn">
        <a href="#">${title}</a>
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