const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', check)
})


function check(e){
    e.preventDefault()

    let user, pass;
    user = document.querySelector("#username").value;
    pass = document.querySelector("#pass").value;

    if([user, pass].includes("")){
        mostrarMensaje('campos vacios', false);
        return;
    }
    
        const formData = new FormData(formulario);
        fetch('https://ivan2001.pythonanywhere.com/admin/check', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            console.log(data);

            mostrarMensaje('Inicio de sesion exitosa', true)
            setTimeout(() => {
                window.location.href = "../admin/confirmacion.html"
            }, 3000)
        })
        .catch((error) => {
            console.log(error);
            mostrarMensaje('No se pudo iniciar sesion, revise los datos ingresados', false)
        })
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



