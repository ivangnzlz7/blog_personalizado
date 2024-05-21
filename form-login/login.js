const formulario = document.querySelector('.form');

function ingresar(){
    let user, pass;
    user = document.querySelector("#username").value;
    pass = document.querySelector("#pass").value;
  
    // Si Existe El Usuario
    const userCreated = JSON.parse(localStorage.getItem(user));
    
    if([user, pass].includes("")){
        mostrarMensaje('campos vacios', false);
        return;
    }
    
    if(userCreated === null){
        mostrarMensaje(`No se ha encontrado el usuario ${user}`, false);
        return;
    }

    if(pass != userCreated.clave){
        mostrarMensaje('La contraseña es invalida', false);
        return;
    }
    
    mostrarMensaje('Inicio de sesion exitosamente', true);
    setTimeout(() => {
        window.location.href = "../logeado/creaTublog.html"
    }, 5000)

}

// Mostrar error
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


/*
let caracteres = {
    nombreUsuario: /^[a-zA-Z0-9]{6,16}$/,
    contrasenia: /^.{8,20}$/
}
 */

// Iconos, Mostrar/ocultar contraseña
let contra = document.getElementById("pass"),
      icono = document.querySelector(".bx");

icono.addEventListener("click", (e) => {
    if (pass.type === "password"){
         pass.type = "text";
         icono.classList.remove("bx-hide")
         icono.classList.add("bx-show-alt")
    }else{
        pass.type = "password"
        icono.classList.add("bx-hide")
        icono.classList.remove("bx-show-alt")
    }
})



