//Referencias html
const btnEnviar = document.querySelector( '#enviar' );
const btnReset = document.querySelector( '#resetBtn' );
const email = document.querySelector( '#email' );
const asunto = document.querySelector( '#asunto' );
const mensaje = document.querySelector( '#mensaje' );
const formulario = document.querySelector( '#enviar-mail' );
const spinner = document.querySelector( '#spinner' );
const validarCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function eventListeners() {
    document.addEventListener( 'DOMContentLoaded', iniciarApp );

    //Validar formulario
    email.addEventListener( 'blur', validarFormulario );
    asunto.addEventListener( 'blur', validarFormulario );
    mensaje.addEventListener( 'blur', validarFormulario );

    //Enviar formulario
    formulario.addEventListener( 'submit', enviarFormulario );

    //Resetar formulario
    btnReset.addEventListener( 'click', limpiarFormulario );
}

eventListeners();

//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add( 'cursor-not-allowed', 'opacity-50' );
}


function validarFormulario( e ) {
    valirdarCampos( e );

    validadorCorreo( e );

    if( validarCorreo.test( email.value ) && asunto.value !== '' && mensaje.value !== '' ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove( 'cursor-not-allowed', 'opacity-50' );
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add( 'cursor-not-allowed', 'opacity-50' );
    }

}


//Enviar Formulario
function enviarFormulario( e ) {
    e.preventDefault();

    //Mostrar el spinner
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';
        mostrarMensaje( 'Mensaje enviado Correctamente', 'green' );
    }, 3000);
}


//validar campos
function valirdarCampos( campo ){
    if( campo.target.value.length > 0 ){
        //Eliminando errores
        const error = document.querySelector('p.error');
        if( error ) {
            error.remove();
        }
        campo.target.classList.remove( 'border', 'border-red-500' );
        campo.target.classList.add( 'border', 'border-green-500' );

    }else {

        campo.target.classList.remove( 'border', 'border-green-500' );
        campo.target.classList.add( 'border', 'border-red-500' );

        mostrarMensaje( 'Todos los campos son obligatorios', 'red');
    }
}

//validar correo
function validadorCorreo( correo ) {
    if( correo.target.type === 'email' ) {
        if( validarCorreo.test( correo.target.value ) ) {
            const error = document.querySelector('p.error');
            if( error ) {
                error.remove();
            }
            correo.target.classList.remove( 'border', 'border-red-500' );
            correo.target.classList.add( 'border', 'border-green-500' );
        } else {
            correo.target.classList.remove( 'border', 'border-green-500' );
            correo.target.classList.add( 'border', 'border-red-500' );   

            mostrarMensaje( 'El E-mail no es valido', 'red' );
        }
    }
}

//Mensaje de error y enviado
function mostrarMensaje( mensaje, color) {
    const parrafo = document.createElement( 'p' );
    const errores = document.querySelectorAll( 'p.error' );
    parrafo.textContent = mensaje;
    parrafo.classList.add( 'border', `border-${color}-500`, `bg-${color}-500`, 'text-white', 'mb-5', 'p-3', 'text-center', 'uppercase', 'font-bold' );
    if( color === 'red' ){
        parrafo.classList.add( 'error' );

        if( errores.length === 0 ) {
            formulario.insertBefore( parrafo, spinner );
        }
    } else {
        formulario.insertBefore( parrafo, spinner );
        setTimeout(() => {
            parrafo.remove();
            formulario.reset();
            iniciarApp();
        }, 5000);
    }   
};

function limpiarFormulario( e ) {
    e.preventDefault();
    formulario.reset();
    iniciarApp();
}
