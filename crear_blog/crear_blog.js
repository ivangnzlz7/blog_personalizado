const submit = document.querySelector('#submit');
const formulario = document.querySelector('#form');
const avisos = document.querySelector('#avisos');

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
        aviso('Completar todos los campos', false);
        return;
    }

    if(nombreUser.length <= 7 && nombreUser.length > 30){
        aviso('minimo 8 y maximo 30 caracteres', false);
        return;
    }

    if(matchM === null || matchm2 === null){ 
        aviso('correo invalido', false)
        return;
    }

    if(password.length <= 7){
        aviso('minimo 8 caracteres', false)
        return;
    }

    if(password != repassword){
        aviso('No coinciden las contraseñas', false)
        return;
    }

    // Guardar Su Informacion
    let usuario = {
        user: nombreUser,
        email: email,
        clave: password
    }
    
    // Buscar Si Existe El Usuario
    let usuarioExistente = JSON.parse(localStorage.getItem('Usuario'));


    // Evitar Duplicas
    if(usuarioExistente.user == usuario.user){
        aviso('Ya existe ese usuario', false)
        return;
    }

    if(usuarioExistente.email == usuario.email){
        aviso('Ya existe el email en el registro', false)
        return;
    }

    //Crear Usuario
    localStorage.setItem('Usuario', JSON.stringify(usuario));

    aviso('Se Registro Exitosamente', true);
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