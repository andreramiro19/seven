// ======================================== HOME ======================================== //
var scrollHomeImg = {
    delay: 200,
    distance: '100%',
    origin: 'left',
    duration: 1200,
    opacity: 0
};

var scrollHomeTitle = {
    delay: 400,
    duration: 1200,
    opacity: 0
};

var scrollHomeSubtitle = {
    delay: 1000,
    duration: 1200,
    opacity: 0
};

var scrollHomeMouse = {
    delay: 1200,
    distance: '200%',
    origin: 'top',
    duration: 1500,
    opacity: 0
};

var scrollHomeSocial1 = {
    delay: 1500,
    duration: 1500,
    opacity: 0
}
var scrollHomeSocial2 = {
    delay: 1600,
    duration: 1500,
    opacity: 0
}
var scrollHomeSocial3 = {
    delay: 1700,
    duration: 1500,
    opacity: 0
}

// ======================================== OFERTAS ======================================== //
var scrollOfertasTitle = {
    delay: 100,
    duration: 2200,
    opacity: 0
}

var card1 = {
    duration: 1500,
    opacity: 0
};

var card2 = {
    delay: 200,
    duration: 1500,
    opacity: 0
};

var card3 = {
    delay: 400,
    duration: 1500,
    opacity: 0
};

// ==================== HOME ==================== //
ScrollReveal().reveal('.home__title', scrollHomeTitle);
ScrollReveal().reveal('.home__subtitle', scrollHomeSubtitle);
ScrollReveal().reveal('.home__media', scrollHomeImg);
ScrollReveal().reveal('.home__scroll', scrollHomeMouse);
ScrollReveal().reveal('.scroll__social1', scrollHomeSocial1);
ScrollReveal().reveal('.scroll__social2', scrollHomeSocial2);
ScrollReveal().reveal('.scroll__social3', scrollHomeSocial3);

// ==================== OFERTAS ==================== //
ScrollReveal().reveal('.scroll-ofertas--title', scrollOfertasTitle);
ScrollReveal().reveal('.card1', card1);
ScrollReveal().reveal('.card2', card2);
ScrollReveal().reveal('.card3', card3);

