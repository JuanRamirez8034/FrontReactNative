/**
 * Componente de Lista Actividades Items
 */
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { StylesListaTareas } from "./styles/Styles";
import { consultarActividades } from "../requestBackend/API-Actividad";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from "@react-navigation/native";
import Actividad from "./ActividadItem";

/**
 * Funcion principal de la Lista Actividades Items
 */
const ListaActividadesItems = ({ idProyecto }) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();

  /**
   * Declaración de los estados
   */
  const [dataActividades, setDataActividades] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  /**
   * IsFocused realiza una acción cuando el usuario esté centrado en el screen
   */
  const isFocus = useIsFocused();

  /**
   * UseEffect para llamar los datos cuando enfoque el screen
   */
  useEffect(() => {
    consultaActividades();
  }, [isFocus]);

  /**
   * UseEffect para refrescar los datos cuando enfoque el screen
   */
  useEffect(() => {
    consultaActividades();
  }, [actualizar]);

  /**
   * Función para consultar las actividad
   */
  const consultaActividades = async () => {
    const infoSolicitud = {
      sesion: true,
      idSesion: infoUsuario.idPersona,
      idProyecto: idProyecto,
    };
    const data = await consultarActividades(infoSolicitud);

    // Si la consulta está vacia llenar campos con activdad default
    if (data[0] == undefined) {
      setDataActividades([
        {
          idProyecto: "00",
          descripcion:
            "Usted no posee actividades en este proyecto, ¡ingrese unos!",
          fechaFin: "0000-00-00",
          fechaInicio: "0000-00-00",
          estado: "activo",
          idActividad: "00",
          monto: "00.00",
        },
      ]);
    } //Si no, llenar con los datos
    else {
      setDataActividades(data);
    }
  };

  /**
   * Función que dibuja cada elemento pasado a traves del llamado del flatList
   */
  const dibujarItems = (actividad) => {
    return (
      <Actividad
        infoActividad={actividad}
        idProyecto={idProyecto}
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
        data={dataActividades}
        keyExtractor={(item) => item.idActividad}
        renderItem={dibujarItems}
      />
    </View>
  );
};

export default ListaActividadesItems;
