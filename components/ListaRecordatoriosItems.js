/**
 * Componente de Lista Recordatorios Items
 */
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { StylesListaTareas } from "./styles/Styles";
import Recordatorio from "./RecordatorioItem";
import { consultarRecordatorios } from "../requestBackend/API-Recordatorios";
import useContextUsuario from "../hook/useContextUsuario";
import { useIsFocused } from "@react-navigation/native";

/**
 * Funcion principal de la Lista Recordatorios Items
 */
const ListaRecordatoriosItem = (props) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();

  /**
   * Declaración de los estados
   */
  const [dataRecordatorios, setDataRecordatorios] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  /**
   * IsFocused realiza una acción cuando el usuario esté centrado en el screen
   */
  const isFocus = useIsFocused();

  /**
   * UseEffect para llamar los datos cuando enfoque el screen
   */
  useEffect(() => {
    consultarRecordatorio();
  }, [isFocus]);

  /**
   * UseEffect para refrescar los datos cuando enfoque el screen
   */
  useEffect(() => {
    consultarRecordatorio();
  }, [actualizar]);

  /**
   * Función para consultar los recordatorios
   */
  const consultarRecordatorio = async () => {
    const infoSolicitud = {
      sesion: true,
      idSesion: infoUsuario.idPersona,
    };
    console.log(JSON.stringify(infoSolicitud));
    const data = await consultarRecordatorios(infoSolicitud);

    // Si la consulta está vacia llenar campos con recordatorios default
    if (data[0] == undefined) {
      setDataRecordatorios([
        {
          idRecordatorio: "00",
          descripcion: "Usted no posee recordatorios, ¡ingrese unos!",
          fechaFin: "Hoy",
          fechaInicio: "Hoy",
          estado: "activo",
          persona_idPersona: infoUsuario.idPersona,
        },
      ]);
    } //Si no, llenar con los datos
    else {
      setDataRecordatorios(data);
    }
  };

  /**
   * Función que dibuja cada elemento pasado a traves del llamado del flatList
   */
  const dibujarItems = (recordatorio) => {
    return (
      <Recordatorio
        infoRecordatorio={recordatorio}
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
        data={dataRecordatorios}
        keyExtractor={(item) => item.idRecordatorio}
        renderItem={dibujarItems}
      />
    </View>
  );
};

export default ListaRecordatoriosItem;
