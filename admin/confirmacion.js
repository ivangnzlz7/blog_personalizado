const form = document.querySelector('#form');
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
    const titulo = document.querySelector('#titulo').value;
    const contenido = document.querySelector('#contenido').value;
    if([titulo, contenido].includes('')) return alert('Campos vacios')
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
    const URL = `http://127.0.0.1:5000/blog/posts/${usr}`;
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        let body = document.querySelector('body');

        
        for(let campo of data) {
            let post = document.createElement('div')
            post.classList.add('posts')
            let actualizacion = campo.actualizacion;
            let update = actualizacion.slice(5, 22)

            post.innerHTML = `
            <br>
            <h2>${campo.titulo}</h2>
            <hr>
            <small><i>${update}</i></small>
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