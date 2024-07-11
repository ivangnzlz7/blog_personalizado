const form = document.querySelector('#form');
let titulo = document.querySelector('#titulo').value;
let contenido = document.querySelector('#contenido').value;
const img = document.querySelector('#cerrar')

window.addEventListener('load',() => {
    form.addEventListener('submit', posts)
});

window.addEventListener('DOMContentLoaded', mostrarDatos);

const usr = localStorage.getItem('usr')

function posts(e){
    e.preventDefault();

    enviarDatos()
}


function enviarDatos() {
    const formData = new FormData(form)
    fetch(`http://127.0.0.1:5000/blog/newPost/${usr}`, {
        method: 'POST',
        body: formData 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = 'confirmacion.html';
    })
    .catch((error) => {
        return error
    })
    .finally(() => form.reset())
}
 
function mostrarDatos() {
    const URL = `https://ivan2001.pythonanywhere.com/blog/posts/${usr}`;
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        let body = document.querySelector('body');

        for(let campo of data) {
            let post = document.createElement('div')
            post.classList.add('posts')

            post.innerHTML = `
            <br>
            <h2>${campo.titulo}</h2>
            <br>
            <p>${campo.contenido}</p>
            <br>
            `
            body.appendChild(post)
        }

        
    })
    .catch(error => {
        console.log(error);
    })

}