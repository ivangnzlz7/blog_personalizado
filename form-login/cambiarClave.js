const formulario = document.querySelector('.form')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', cambiarPassword)
});


function cambiarPassword(e) {
    e.preventDefault();

    let user = document.querySelector('#email').value;
    let newPass = document.querySelector('#new-password').value;
    let repeatPass = document.querySelector('#repeat-new-password').value;

    const userLogin = JSON.parse(localStorage.getItem(user));

    
    if([user, newPass, repeatPass].includes("")){
        mostrarMensaje('Los campos son obligatorios', false);
        return;
    }
    
    if(userLogin === null){
        mostrarMensaje(`No existe el usuario ${user}`, false);
        return;
    }

    if(user != userLogin.user){
        mostrarMensaje('Usuario incorrecto', false);
        return;
    }

    if(newPass != repeatPass){
        mostrarMensaje('Los password no coinciden', false);
        return;
    }

    
    
    let usuarioNuevo = {
        user: user,
        email: userLogin.email,
        clave: newPass
    }

    localStorage.removeItem(userLogin);
    
    localStorage.setItem(user, JSON.stringify(usuarioNuevo));


    mostrarMensaje('Modificacion del password exitosamente', true);

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


