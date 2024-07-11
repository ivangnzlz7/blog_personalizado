const form = document.querySelector('#form2');

window.addEventListener('load', () => {
    form.addEventListener('submit', deletePost)
})


function deletePost(e){
    const usr = localStorage.getItem('usr')
    e.preventDefault();
    if(confirm('¿Estas seguro que quieres eliminar?')){
        const formData = new FormData(form);
        fetch(`http://127.0.0.1:5000/blog/user/${usr}/posts`, {
            method: 'DELETE',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('El post ha sido eliminado exitosamente')
            setTimeout(() => {
                window.location.href = '../confirmacion.html'
            }, 3000)
        })
        .catch((error) => {
            console.log(error);
            alert('El post no se pudo eliminar')
        })
    }
}