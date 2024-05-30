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