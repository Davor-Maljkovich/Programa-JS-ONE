import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");  //Lee todos los inputs

inputs.forEach( input =>{   //Para cada input
    input.addEventListener('blur',(input) =>{   //Cuando pierde el foco, ejecuta la func. con input
        valida(input.target);
    })     
})