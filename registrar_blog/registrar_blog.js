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
    const tematica = document.querySelector('#temablog').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const repassword = document.querySelector('#repassword').value;
    let matchM = email.match(/.com/gi);
    let matchm2 = email.match(/@/gi);

    // Validar Campos
    if([nombreUser, tematica, email, password, repassword].includes("")){
        let inputs = [nom, tema, ema, pass, repass]

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.add('errorEnCampos')
        }
        aviso('Completar todos los campos', false);
        return;
    } else {
        let inputs = [nom, tema, ema, pass, repass]

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
    let usuario = {
        user: nombreUser,
        email: email,
        clave: password
    }
    
    // Buscar Si Existe El Usuario
    let usuarioExistente = JSON.parse(localStorage.getItem(nombreUser));

    // Si El Usuario No Existe
    if(usuarioExistente === null){
        //Crear Usuario
        localStorage.setItem(nombreUser, JSON.stringify(usuario));

        aviso('Se Registro Exitosamente', true);
        return;
    }


    // Evitar Duplicas
    if(usuarioExistente.user == usuario.user){
        aviso('Ya existe ese usuario', false)
        return;
    }

    if(usuarioExistente.email == usuario.email){
        aviso('Ya existe el email en el registro', false)
        return;
    } 


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