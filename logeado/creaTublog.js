document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.scroll-element');

    elements.forEach(element => {
        element.classList.add('visible');
    });
})