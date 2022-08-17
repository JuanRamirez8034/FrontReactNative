// funciones para tabla persona
import APISERVER from './ConfigAPI';

//funion de registro de personas o usuarios nuevos
export const registrarPersona = async (infoPersona) =>{
    const respuesta = await fetch(
        `${APISERVER}/personas/registro`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoPersona)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa ' + error.message);
    });
    return await respuesta.json();
}

//funion dconsulta datos persona
export const consultaDatosPersona = async (infoSolicitud) =>{
    console.log('hgggjg')
    const respuesta = await fetch(
        `${APISERVER}/personas/consulta-datos`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de consulta datos de persona' + error.message);
    });
    return await respuesta.json();
}

//funion de consulta que muestra todos los datos de un freelance
export const consultaAllDatosPersona = async (infoSolicitud) =>{
    console.log('hgggjg')
    const respuesta = await fetch(
        `${APISERVER}/personas/consulta/datos/all`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de consulta datos de persona' + error.message);
    });
    return await respuesta.json();
}