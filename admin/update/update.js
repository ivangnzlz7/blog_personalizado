const form = document.querySelector('#form3')


window.addEventListener('load', () => {
    form.addEventListener('submit', updatePost)
});

function updatePost(e){
    e.preventDefault()
    const usr = localStorage.getItem('usr')
    if(confirm('¿Estas seguro de actualizar el post?')){
        const formData = new FormData(form);
        fetch(`http://127.0.0.1:5000/blog/post/update/${usr}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Post actualizado exitosamente')
            setTimeout(() => {
                window.location.href = '../confirmacion.html'
            }, 3000)
        })
        .catch((error) => {
            console.log(error);
            alert('El post no se pudo actualizar')
        })
    }
}