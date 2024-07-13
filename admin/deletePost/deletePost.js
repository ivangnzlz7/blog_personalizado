const form = document.querySelector('#form2');

window.addEventListener('load', () => {
    form.addEventListener('submit', deletePost)
})


function deletePost(e){
    e.preventDefault();

    const usr = localStorage.getItem('usr');
    const titulo = document.querySelector('#titulo').value;
    if(titulo == "") return alert('El campo esta vacio');


    if(confirm('¿Estas seguro que quieres eliminar?')){
        const formData = new FormData(form);
        fetch(`https://ivan2001.pythonanywhere.com/blog/user/${usr}/posts`, {
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