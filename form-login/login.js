const formulario = document.querySelector('#form');
const messege = document.querySelector('.messege');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', check)
})


function check(e){
    e.preventDefault()

    let user, pass;
    user = document.querySelector("#usuario").value;
    pass = document.querySelector("#password").value;

    if([user, pass].includes("")){
        limpiarRes();
        mostrarMensaje('campos vacios', false);
        return;
    }
    
        const formData = new FormData(formulario);
        fetch('http://127.0.0.1:5000/admin/check', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) 
        .then(data => {
            console.log(data);

            if(data == false){
                limpiarRes();
                mostrarMensaje(`No se encontro el usuario ${user}`, false)
                return;
            }

            localStorage.setItem('usr', data)
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
            <p style="text-align: center; font-size: 26px; color: blue;">${mensaje}</p>
            `
            messege.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 4000);
            return;
        }  
            alerta.innerHTML = `
            <p style="font-size: 26px; color: red; padding-left: 262px;">${mensaje}</p>
            `
            messege.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 4000);
    }
}

function limpiarRes(){
    while(messege.firstChild){
       messege.removeChild(messege.firstChild)
    }
}


