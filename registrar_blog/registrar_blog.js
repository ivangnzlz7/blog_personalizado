const submit = document.querySelector('#submit');
const formulario = document.querySelector('#form');
const avisos = document.querySelector('#avisos');
let nom = document.querySelector('#usuario');
let tema = document.querySelector('#temablog');
let ema = document.querySelector('#email');
let pass = document.querySelector('#password');
let repass = document.querySelector('#repassword');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', check);
})


function check(e){
    e.preventDefault();
    
    const nombreUser = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const repassword = document.querySelector('#repassword').value;
    let matchM = email.match(/.com/gi);
    let matchm2 = email.match(/@/gi);

    // Validar Campos
    if([nombreUser, email, password, repassword].includes("")){
        let inputs = [nom, ema, pass, repass]

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.add('errorEnCampos')
        }
        aviso('Completar todos los campos', false);
        return;
    } else {
        let inputs = [nom, ema, pass, repass]

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('errorEnCampos');
        }
    }

    if(nombreUser.length <= 7 && nombreUser.length > 30){
        nom.classList.add('errorEnCampos')
        aviso('minimo 8 y maximo 30 caracteres', false);
        return;
    } else {
        nom.classList.remove('errorEnCampos')
    }

    if(matchM === null || matchm2 === null){ 
        ema.classList.add('errorEnCampos');
        aviso('correo invalido', false);
        return;
    } else {
        ema.classList.remove('errorEnCampos');
    }

    if(password.length <= 7){
        pass.classList.add('errorEnCampos')
        aviso('minimo 8 caracteres', false)
        return;
    } else {
        pass.classList.remove('errorEnCampos')
    }

    if(password != repassword){
        pass.classList.add('errorEnCampos');
        repass.classList.add('errorEnCampos');
        aviso('No coinciden las contraseñas', false)
        return;
    } else {
        pass.classList.remove('errorEnCampos');
        repass.classList.remove('errorEnCampos');
    }

    // Guardar Su Informacion
    const formData = new FormData(formulario);
        fetch('http://127.0.0.1:5000/admin/add', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            aviso('Se registro correctamente', true)
        })
        .catch((error) => {
            console.log(error);
            aviso('algo fallo', false)
        })
}




function aviso(mensaje, res) {
    const alerta = document.querySelector('.error')

    if (!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('error');
         if(res === true){
            alerta.innerHTML = `
            <p style="text-align: center; font-size: 22px; color: blue;">${mensaje}</p>
            `
            avisos.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 6000);
         }  else {
            alerta.innerHTML = `
            <p style="text-align: center; font-size: 22px; color: red;">${mensaje}</p>
            `
            avisos.appendChild(alerta);
    
            setTimeout(() => {
                alerta.remove();
            }, 6000);
         }

    }
}