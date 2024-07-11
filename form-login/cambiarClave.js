const formulario = document.querySelector('#formulario2')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', cambiarPassword)
});


function cambiarPassword(e) {
    e.preventDefault();

    let user = document.querySelector('#email').value;
    let newPass = document.querySelector('#new-password').value;
    let repeatPass = document.querySelector('#repeat-new-password').value;

    
    if([user, newPass, repeatPass].includes("")){
        mostrarMensaje('Los campos son obligatorios', false);
        return;
    }
    
    const formData = new FormData(formulario);
        fetch('http://127.0.0.1:5000/admin/update', {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarMensaje('Se actualizo el password correctamente', true)
        })
        .catch((error) => {
            console.log(error);
            mostrarMensaje('No se pudo actualizar el password, revise los datos ingresados', false)
        })
} 


// Mostrar Mensaje
function mostrarMensaje(mensaje, res) {
    const alerta = document.querySelector('.mensaje')

    if (!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('.mensaje');
         if(res === true){
            alerta.innerHTML = `
            <p style="text-align: center; font-size: 14px; color: blue;">${mensaje}</p>
            `
            formulario.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 4000);
         }  else {
            alerta.innerHTML = `
            <p style="text-align: center; font-size: 14px; color: red;">${mensaje}</p>
            `
            formulario.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 4000);
         }

    }
}


