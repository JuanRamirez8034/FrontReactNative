/**
 * Componente de Lista Tareas Items
 */
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { StylesListaTareas } from "./styles/Styles";
import Tarea from "./TareaItem";
import { consultaTareasDiarias } from "../requestBackend/API-Consultas";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from "@react-navigation/native";

/**
 * Funcion principal de la Lista Tareas Items
 */
const ListaTareasIten = (props) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();
  /**
   * Declaración de los estados
   */
  const [estadoActualizar, setEstadoActualizar] = useState(false);
  const [dataTareas, setDataTareas] = useState([]);
  /**
   * Fecha actual del dispositivo
   */
  const fechaActual = new Date().toISOString().slice(0, 10);
  /**
   * IsFocused realiza una acción cuando el usuario esté centrado en el screen
   */
  const isFocus = useIsFocused();

  /**
   * UseEffect para llamar los datos cuando enfoque el screen
   */
  useEffect(() => {
    consultarTareas();
  }, [isFocus]);

  /**
   * Función para consultar las tareas diarias
   */
  const consultarTareas = async () => {
    const infoSolicitud = {
      sesion: true,
      idSession: infoUsuario.idPersona,
      fechaFin: fechaActual,
      estado: 1,
    };
    const data = await consultaTareasDiarias(infoSolicitud);

    // Si la consulta está vacia llenar campos con activdad default
    if (data[0] == undefined) {
      setDataTareas([
        {
          idActividad: "01",
          descripcion: "Usted no posee actividades hoy, ¡mire series!",
          fechaInicio: "2022-09-18 00:00",
          fechaFin: "2022-06-17 00:00",
          estado: null,
          proyecto_idProyecto: "01",
          idProyecto: "01",
          persona_idPersona: null,
        },
      ]);
    } //Si no, llenar con los datos
    else {
      setDataTareas(data);
    }
  };

  /**
   * Función para cambiar el estado al actualizar la lista de tareas
   */
  const actualizarActiva = useCallback(async () => {
    // cargando el estado de refreshing
    setEstadoActualizar(true);
    // ejecutar de forma asincrona la funcion de llamar las tareas
    await consultarTareas();
    // cargando el estado de refreshing
    setEstadoActualizar(false);
  });

  /**
   * Función que dibuja cada elemento pasado a traves del llamado del flatList
   */
  const dibujarItems = (tarea) => {
    return <Tarea infoTarea={tarea} actualizarLista={actualizarActiva} />;
  };

  /**
   * Return del componente
   */
  return (
    <View style={StylesListaTareas.container}>
        
      {/* Encabezado */}
      <View style={StylesListaTareas.cabeceraLista}>
        <Text style={StylesListaTareas.tituloCabeceraLista}>
          LISTA DE TAREAS
        </Text>
      </View>

      {/* Lista */}
      <FlatList
        data={dataTareas}
        keyExtractor={(item) => {
          return item.fechaInicio + "_" + item.fechaFin + Math.random();
        }}
        renderItem={dibujarItems}
        refreshControl={
          <RefreshControl
            refreshing={estadoActualizar}
            onRefresh={actualizarActiva}
            colors={["white"]}
            progressBackgroundColor="#FEB529"
          />
        }
      />
    </View>
  );
};

export default ListaTareasIten;
