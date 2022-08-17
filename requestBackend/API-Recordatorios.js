// funciones de recordatorios para bdd
import APISERVER from './ConfigAPI';

//registrar recordatorio nuevo
export const registrarRecordatorio = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/recordatorios/registro`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de registro de recordatorios' + error.message);
        });
    return await respuesta.json();
}

//funion de actualizar recordatorio
export const actualizarRecordatorios = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/recordatorios/actualizar`,
        {
            method:"PUT",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa actualizar recordatorios' + error.message);
        });
    return await respuesta.json();
}

//consultar recordatorio nuevo
export const consultarRecordatorios = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/recordatorios/consulta`,
        {
            method:"POST",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de consulta de recordatorios' + error.message);
        });
    return await respuesta.json();
}
//consultar recordatorio nuevo
export const eliminarRecordatorio = async (infoSolicitud) =>{
    const respuesta = await fetch(
        `${APISERVER}/recordatorios/eliminar`,
        {
            method:"DELETE",
            headers: {Accept:"application/json", "Content-Type":"application/json"},
            body: JSON.stringify(infoSolicitud)
        }
    )
    .catch(function(error) {
        console.log('Error durante la promesa de eliminar de recordatorio' + error.message);
        });
    return await respuesta.json();
}