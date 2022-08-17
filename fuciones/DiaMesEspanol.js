export const nombreDia = (numeroDia)=>{
    const dia = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    switch (numeroDia) {
        case 0:
            return(dia[6]);
            break;
    
        default:
            return(dia[numeroDia-1]);
            break;
    }
}


export const nombreMes = (numeroMes)=>{
    const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return(mes[numeroMes]);
}