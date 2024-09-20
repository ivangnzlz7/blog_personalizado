const formulario = document.querySelector('#form');
const messege = document.querySelector('.messege2');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', cambiarPassword)
});


function cambiarPassword(e) {
    e.preventDefault();

    let user = document.querySelector('#usuario').value;
    let newPass = document.querySelector('#password').value;
    let repeatPass = document.querySelector('#repeat-password').value;

    
    if([user, newPass, repeatPass].includes("")){
        limpiarRes();
        mostrarMensaje('Los campos son obligatorios', false);
        return;
    }
    
    const formData = new FormData(formulario);
        fetch('https://ivan2001.pythonanywhere.com/admin/update', {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            limpiarRes();
            mostrarMensaje('Se actualizo el password correctamente', true)
        })
        .catch((error) => {
            console.log(error);
            limpiarRes();
            mostrarMensaje('Datos incorrectos', false)
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
            <p style="text-align: center; font-size: 22px; color: blue;">${mensaje}</p>
            `
            messege.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 4000);
            return;
        } 
            alerta.innerHTML = `
            <p style="text-align: center; font-size: 22px; color: red; max-width: 360px;">${mensaje}</p>
            `
            messege.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 4000);
        

    }
}

// Limpiar las respuestas
function limpiarRes(){
    while(messege.firstChild){
        messege.removeChild(messege.firstChild);
    }
}


