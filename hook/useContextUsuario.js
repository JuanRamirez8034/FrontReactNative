import React,{useContext} from "react";
import ContextUsuario from "../Context/ContextUsuario";

/**
 * Funcion que permite acceder a los datos almacenados en el context
 * sin la necesidad de utilizar clases
 */
export default () => useContext(ContextUsuario);