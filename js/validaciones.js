export function valida(input){
    const tipoInput = input.dataset.tipo; //del data-tipo en #birth
    if(validadores[tipoInput]){ //Cuando el input sea el querido(el de fecha en este caso)
        validadores[tipoInput](input); 
    }
    //Si no rellenas un campo necesario
    if(input.validity.valid){   
        input.parentElement.classList.remove("input-container--invalid"); //Si el elemento es correcto saco el msj rojo
        input.parentElement.querySelector(".input-message-error").innerHTML=" ";
    }
    else{
        input.parentElement.classList.add("input-container--invalid"); //Si el elemento es incorrecto pongo msj rojo
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoInput, input);
    }
}

const tipoDeErrores= [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError={
    nombre:{
        valueMissing:"El campo nombre no puede estar vacio" //Propiedad de campo vacio
    },
    email:{
        valueMissing:"El campo correo no puede estar vacio",
        typeMismatch:"El correo no es valido"
    },
    password:{
        valueMissing:"El campo contraseña no puede estar vacio",
        patternMismatch:"al menos 8 caracteres , debe contener letra minuscula, mayuscula y numero" //Se usa pattern por el patron que se requiere para la contraseña aceptable
    },
    nacimiento:{
        valueMissing:"El campo edad no puede estar vacio",
        customError:"Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX (10 NUMEROS)"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe tener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe tener entre 10 y 40 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe tener entre 10 y 40 caracteres"
    }
};


const validadores = {
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoInput, input){
    let mensaje=" "
    tipoDeErrores.forEach(error =>{ //Recorre los errores
        if(input.validity[error]){ //Si el error es true
            mensaje= mensajesDeError[tipoInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje="";
    if(!mayorEdad(fechaCliente)){ //Recordar "!"" niega, en este caso la condicion es cuando no se cumpla
        mensaje="Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date(); 
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
         fecha.getUTCDate());
    return  diferenciaFecha <= fechaActual; //Si la fecha elegida +18 es menor o igual que la actual, significa que el usuario es +18
}