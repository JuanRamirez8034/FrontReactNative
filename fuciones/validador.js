/**
 * Funciones para validar datos y parametros
 */

export const numeroParametros = (objetoSolicitud) => {
    try {
        return parseInt(Object.keys(objetoSolicitud).length);
    } catch (e) {
        return 0;
    }
}

export const validarCorreo = (correo) => {
    //constructor expresion regular
    const expresion = /^[\w-_.+]+@[\w-_]+\.[a-zA-Z]{2,5}$/i;
    return expresion.test(correo);
}

export const validarContrasena = (contrasena) => {
    // minimo 7 caracteres
    if (contrasena.length < 7) {
        return { "contrasena": "No contiene min 7 caracteres" };
    }
    //minusculas 1
    let expresion = /[a-z]/;
    let resultado = expresion.test(contrasena);
    if (!resultado) {
        return { "contrasena": "No contiene minúsculas" };
    }
    //mayusculas 1
    expresion = /[A-Z]/;
    resultado = expresion.test(contrasena);
    if (!resultado) {
        return { "contrasena": "No contiene mayúsculas" };
    }
    //numeros 1
    expresion = /[0-9]/;
    resultado = expresion.test(contrasena);
    if (!resultado) {
        return { "contrasena": "No contiene números" };
    }
    //caracter especial 1
    expresion = /[^a-zA-Z0-9\s:;,`\{\}\[\]\'\"\º\<\>]/;
    resultado = expresion.test(contrasena);
    if (!resultado) {
        return { "contrasena": "No contiene caracter especial (-_*+$#.)" };
    }
    //sin espacios
    expresion = /[\s]/;
    resultado = expresion.test(contrasena);
    if (resultado) {
        return { "contrasena": "No puede contener espacios" };
    }
    //todo bien
    return true;
}

export const validarNombreApellido = (nombreApellido) => {
    //constructor expresion regular (solo letras y espacios)
    const expresion = /[^a-zA-Záéíóúäëïöüàèìòù ]/i;
    return (!expresion.test(nombreApellido));
}

export const validarFecha = (fecha) => {
    // expresion formatos permitidos 0000-00-00 0000/00/00 0000.00.00
    const expresion = /^\d{4}([\-/.])(0?[1-9]|1[0-2])\1(3[01]|[12][0-9]|0?[1-9])$/i;
    return expresion.test(fecha);
}

export const validarDatosRegistroPersona = (objetoSolicitud = 0) =>{

    if (objetoSolicitud.nombrePersona != undefined && objetoSolicitud.nombrePersona ===''){
        return {"result":false, "alerta": "Campo 'Nombre' no puede estar vacio"};
    }

    if (objetoSolicitud.nombrePersona != undefined && !validarNombreApellido(objetoSolicitud.nombrePersona)){

        return {"result":false, "alerta": "Nombre solo debe contener letras"};
    }

    if (objetoSolicitud.apellidoPersona != undefined && objetoSolicitud.apellidoPersona ===''){
        return {"result":false, "alerta": "Campo 'apellido' no puede estar vacio"};
    }

    if(objetoSolicitud.apellidoPersona != undefined && !validarNombreApellido(objetoSolicitud.apellidoPersona)){

        return {"result":false, "alerta": "Apellido solo debe contener letras"};
    }

    if (objetoSolicitud.usuario != undefined && objetoSolicitud.usuario ===''){
        return {"result":false, "alerta": "Campo 'usuario' no puede estar vacio"};
    }

    if (objetoSolicitud.fechaNacimiento != undefined && !validarFecha(objetoSolicitud.fechaNacimiento)){

        return {"result":false, "alerta": "Fecha nacimiento inválida, \nEjemplo: \n1999-01-01\n1999.06.06\n1999-12-31"};
    }

    if (objetoSolicitud.fechaInicio != undefined && !validarFecha(objetoSolicitud.fechaInicio)) {

        return { "result": false, "alerta": "Fecha 'Inicio' inválida, \nEjemplo: \n1999-01-01\n1999.06.06\n1999-12-31" };
    }

    if (objetoSolicitud.fechaFin != undefined && !validarFecha(objetoSolicitud.fechaFin)) {

        return { "result": false, "alerta": "Fecha 'Fin' inválida, \nEjemplo: \n1999-01-01\n1999.06.06\n1999-12-31" };
    }
    
    if (objetoSolicitud.fecha != undefined && !validarFecha(objetoSolicitud.fecha)) {

        return { "result": false, "alerta": "Fecha inválida, \nEjemplo: \n1999-01-01\n1999.06.06\n1999-12-31" };
    }

    if (objetoSolicitud.fechaInicio != undefined && !validarFecha(objetoSolicitud.fechaInicio)){

        return {"result":false, "alerta": "Fecha inicio inválida"};
    }
    if (objetoSolicitud.fechaFin != undefined && !validarFecha(objetoSolicitud.fechaFin)){

        return {"result":false, "alerta": "Fecha fin inválida"};
    }

    if(objetoSolicitud.horaInicio != undefined && validarHora(objetoSolicitud.horaInicio)){

        return {"result":false, "alerta": "Formato de hora 'Inicial' no válido, el formato aceptado es de '24'horas.\nEjemplo: 23:59"};  
    }
    
    if(objetoSolicitud.horaFin != undefined && validarHora(objetoSolicitud.horaFin)){

        return {"result":false, "alerta": "Formato de hora 'Finalizacion' no válido, el formato aceptado es de '24'horas.\nEjemplo: 23:59"};  
    }

    if(objetoSolicitud.hora != undefined && validarHora(objetoSolicitud.hora)){

        return {"result":false, "alerta": "Formato de hora no válido, el formato aceptado es de '24'horas.\nEjemplo: 23:59"};  
    }

    if(objetoSolicitud.correo != undefined && !validarCorreo(objetoSolicitud.correo)){

        return {"result":false, "alerta": "Formato de correo no válido"};  
    }

    if(objetoSolicitud.contrasena != undefined && validarContrasena(objetoSolicitud.contrasena) != true){

        var resul = validarContrasena(objetoSolicitud.contrasena);
        const mensaje = `Contraseña: ${resul.contrasena}`;
        return {"result":false, "alerta": mensaje};
    }
    
    return {"result":true};
}

export const validarRangoFechaInicioFin = (objetoSolicitud = {fechaFin:'2000-01-03', fechaInicio:'2000-01-05'}) =>{
    const fecha_inicio = new Date(objetoSolicitud.fechaInicio); 
    const fecha_fin = new Date(objetoSolicitud.fechaFin);
    if(fecha_inicio.getTime() <= fecha_fin.getTime()){
        return true;
    }
    return false;
}

export const validarCifrasNumericas = (cifra) =>{
    const expresion = /^[0-9]+([.]||[,])?([0-9]{0,2})?$/;
    return !expresion.test(cifra);
}

export const validarHora = (hora)=>{
    const expresion = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return !expresion.test(hora);
}