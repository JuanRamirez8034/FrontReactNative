import React,{createContext} from "react";

/**
 * Constante que contiene la informacion del usuario
 * para llamarla en cualquier parte del la aplicacion 
 * en donde se solicite
 */
const ContextUsuario = createContext({
    "idPersona":null,
    "nombrePersona":null,
    "apellidoPersona":null,
    "fechaNacimiento":null,
    "usuario": null,
    "correo" : null
});

export default ContextUsuario;