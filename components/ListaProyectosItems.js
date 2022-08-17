/**
 * Componente de Lista Proyectos Items
 */
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { StylesListaTareas } from "./styles/Styles";
import Proyecto from "./ProyectoItem";
import { consultaProyectos } from "../requestBackend/API-Proyectos";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from "@react-navigation/native";

/**
 * Funcion principal de la Lista Proyectos Items
 */
const ListaProyectosItem = (props) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();

  /**
   * Declaración de los estados
   */
  const [dataProyectos, setDataProyectos] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  /**
   * IsFocused realiza una acción cuando el usuario esté centrado en el screen
   */
  const isFocus = useIsFocused();

  /**
   * UseEffect para llamar los datos cuando enfoque el screen
   */
  useEffect(() => {
    consultarProyectos();
  }, [isFocus]);

  /**
   * UseEffect para refrescar los datos cuando enfoque el screen
   */
  useEffect(() => {
    consultarProyectos();
  }, [actualizar]);

  /**
   * Función para consultar los proyectos
   */
  const consultarProyectos = async () => {
    const infoSolicitud = {
      sesion: true,
      idSesion: infoUsuario.idPersona,
    };
    const data = await consultaProyectos(infoSolicitud);

    // Si la consulta está vacia llenar campos con proyectos default
    if (data[0] == undefined) {
      setDataProyectos([
        {
          idProyecto: 0,
          descripcion: "Usted no posee proyectos, ¡ingrese unos!",
          fechaFin: "0000-00-00 00:00:00",
          fechaInicio: "0000-00-00 00:00:00",
          monto: "0,00",
          estado: "activo",
          persona_idPersona: undefined,
        },
      ]);
    } //Si no, llenar con los datos
    else {
      setDataProyectos(data);
    }
  };

  /**
   * Función que dibuja cada elemento pasado a traves del llamado del flatList
   */
  const dibujarItems = (proyecto) => {
    return (
      <Proyecto
        infoProyecto={proyecto}
        navegar={props.navegar}
        actualizar={() => setActualizar(!actualizar)}
      />
    );
  };

  /**
   * Return del componente
   */
  return (
    <View style={[StylesListaTareas.container, { height: "50%" }]}>
      <FlatList
        data={dataProyectos}
        keyExtractor={(item) => item.idProyecto}
        renderItem={dibujarItems}
      />
    </View>
  );
};

export default ListaProyectosItem;
