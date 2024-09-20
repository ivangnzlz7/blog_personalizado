const menu = document.querySelector('#menu');
const cerrar = document.querySelector('#cerrar');
const navegacion = document.querySelector('.createBlog');

menu.addEventListener('click', () => {
    navegacion.classList.add('visible')
})

cerrar.addEventListener('click', () => {
    navegacion.classList.remove('visible')
})


document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.zoom-element');

    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });

    window.addEventListener('scroll', () => {
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    });
});