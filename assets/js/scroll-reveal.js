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

// ======================================== HOME ======================================== //
var scrollHomeImg = {
    delay: 200,
    distance: '100%',
    origin: 'left',
    duration: 1200,
    opacity: 0
};

var scrollHomeAnim = {
    delay: 200,
    duration: 2200,
    opacity: 0
}

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

var scrollHomeButton = {
    delay: 1200,
    distance: '50%',
    duration: 1200,
    opacity: 0
};

var scrollHomeMouse = {
    delay: 1200,
    distance: '100%',
    origin: 'top',
    duration: 1500,
    opacity: 0
};

// ==================== HOME ==================== //
ScrollReveal().reveal('.scroll-home-title', scrollHomeTitle);
ScrollReveal().reveal('.scroll-home-subtitle', scrollHomeSubtitle);
ScrollReveal().reveal('.scroll-home-button', scrollHomeButton);
ScrollReveal().reveal('.scroll-home-img', scrollHomeImg);
ScrollReveal().reveal('.scroll-home-anim', scrollHomeAnim);
ScrollReveal().reveal('.scroll-home-mouse', scrollHomeMouse);

// ==================== OFERTAS ==================== //
ScrollReveal().reveal('.scroll-ofertas--title', scrollOfertasTitle);
ScrollReveal().reveal('.card1', card1);
ScrollReveal().reveal('.card2', card2);
ScrollReveal().reveal('.card3', card3);

