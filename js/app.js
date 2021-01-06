const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const resetForm = document.querySelector('#resetBtn');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', deshabilitarEnvio);

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

    // Resetear Formulario
    resetForm.addEventListener('click', resetearFormulario);
}

function deshabilitarEnvio() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {

    // El campo no está vacío
    if(e.target.value.length > 0) {

        // Elimina los errores
        const error = document.querySelector('p.error');

        if(error != null) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else {
        // e.target.style.borderBottomColor = 'red';
        // e.target.classList.add('error');
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        // const resultado = e.target.value.indexOf('@');
        // if(resultado < 0) {
        //     mostrarError('El email no es válido')
        // }
        if(regex.test(e.target.value)) {
            const error = document.querySelector('p.error');

            if(error != null) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no es válido');
        }
    }

    if(regex.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }else {
        deshabilitarEnvio();
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }   
}

function removerError() {
    const mensajeError = document.querySelector('form#enviar-mail > p');
    const errores = document.querySelectorAll('.error');
    
    if(errores.length > 0) {
        formulario.removeChild(mensajeError);
    }
}

function enviarEmail(e) {
    e.preventDefault();

    // Mostrar el Spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Ocultar el spinner luego de 3ms
    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje de envío
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'background-green-500');

        // Inserción de mensaje
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => {
            // Limpiar valores y bordes
            limpiarCampos(email);
            limpiarCampos(asunto);
            limpiarCampos(mensaje);
            const mensajeConfirmacion = document.querySelector('p.text-center.my-10.p-5.background-green-500');
            mensajeConfirmacion.remove();
        }, 3000);


    }, 3000);
}

function limpiarCampos(campo) {
    campo.value = '';
    campo.classList.remove('border', 'border-red-500');
    campo.classList.remove('border', 'border-green-500');
}

function resetearFormulario(e) {
    e.preventDefault();
    limpiarCampos(email);
    limpiarCampos(asunto);
    limpiarCampos(mensaje);
    // Ocultar mensaje de error si existe
    removerError();
}

