/*==================== Ofertas ====================*/
const db = firebase.firestore();
const shopList = document.querySelector('[data-js="ofertas-list"]');

db.collection('ofertas').onSnapshot(snapshot => {
    const shopLis = snapshot.docs.reduce((acc, doc) => {
        const { img, title, description, price } = doc.data()
        acc += `
        <li class="ofertas__card" data-id="${doc.id}">
            <div class="card__ofertas card1" data-id="${doc.id}">
                <div class="card__img" data-id="${doc.id}">
                    <img src=${img} alt="Imagem do produto" data-id="${doc.id}">
                </div>
                <div class="card__stars" data-id="${doc.id}">
                    <i class="star uil uil-star"></i>
                    <i class="star uil uil-star"></i>
                    <i class="star uil uil-star"></i>
                    <i class="star uil uil-star"></i>
                    <i class="star uil uil-star"></i>
                </div>
                <div class="card__data" data-id="${doc.id}">
                    <h1 class="card__title" data-id="${doc.id}">${title}</h1>
                    <p class="card__description" data-id="${doc.id}">${description}</p>
                    <span class="card__price" data-id="${doc.id}">${price}</span>
                </div>
            </div>
        </li>`

        return acc
    }, '')

    shopList.innerHTML = shopLis

    const ofertasCard = document.querySelectorAll('.ofertas__card');
        ofertasCard.forEach(btn => {
                btn.addEventListener('click', async (e) => {

                    const getTask2 = (id) => db.collection('ofertas').doc(id).get();

                    const doc = await getTask2(e.target.dataset.id);

                    const { title, description } = doc.data()

                    var pato = "Gostaria de comprar o " + title + description

                    window.open('https://wa.me/5535988911129?text=' + pato);
                    

                })
            });
    })

/*==================== Loja ====================*/
const shopList2 = document.querySelector('[data-js="loja-list"]');

db.collection('loja').orderBy("title").limit(8).onSnapshot(snapshot => {
    const shopLis2 = snapshot.docs.reduce((acc, doc) => {
        const { img, title, description, price } = doc.data()
        acc += `
        <div class="swiper-slide" data-id="${doc.id}">
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
        </div>
        `

        return acc
    }, '')

    shopList2.innerHTML = shopLis2
    })