/**
 * Componente del Item de Tarea
 */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from "react-native";
import { StylesTarea } from "./styles/Styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useContextUsuario from "../hook/useContextUsuario";
import { actualizarActividad } from "../requestBackend/API-Actividad";
import { actualizarRecordatorios } from "../requestBackend/API-Recordatorios";
import { procesoRegistroIngresoProyecto } from "../requestBackend/API-Consultas";
import AlertModalInfoTareas from "./AlertModalInfoTareas";

/**
 * Funcion principal del Item de Tarea
 */
const Tarea = ({ infoTarea, actualizarLista }) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();

  /**
   * Declaración de los estados
   */
  // estado para cambiar el color e icono de tarea atrasada
  const [atrasada, setAtrasada] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //estado inicial del checkbox
  const [estadoTarea, setEstadoTarea] = useState(
    infoTarea.item.estado === "Activo" ? false : true
  );

  /**
   * Declaración de las fechas
   */
  const fechaTarea = new Date(infoTarea.item.fechaFin.slice(0, 10));
  const fechaActual = new Date(new Date().toISOString().slice(0, 10));

  /**
   * Función para determinar si la tarea esta atrasada
   */
  const handleStyleAtrasada = () => {
    if (fechaActual.getTime() > fechaTarea.getTime()) {
      setAtrasada(true);
    }
  };

  /**
   * UseEffect para llamar la función para determinar si la tarea esta atrasada cada vez que se renderiza la pantalla
   */
  useEffect(() => {
    handleStyleAtrasada();
  }, []);

  /**
   * Función para cambiar estado de la tarea
   */
  const actualizaEstado = async () => {
    // Si la infoTarea es una actividad default
    if (
      infoTarea.item.estado === null &&
      infoTarea.item.persona_idPersona === null
    ) {
      Alert.alert("¡AVISO!", "Esto no es una tarea actualizable", [
        { text: "Entiendo!" },
      ]);
      return;
    }

    // Si la infoTarea no es una actividad default
    if (infoTarea.item.idActividad != null) {
      const data = await actualizarActividad({
        sesion: true,
        idSesion: infoUsuario.idPersona,
        descripcion: infoTarea.item.descripcion,
        fechaInicio: infoTarea.item.fechaInicio,
        fechaFin: infoTarea.item.fechaFin,
        estado: estadoTarea ? "Activo" : "Terminado",
        idActividad: infoTarea.item.idActividad,
        idProyecto: infoTarea.item.idProyecto,
      });

      if (data.resultado === true && data.info.affectedRows !== 0) {
        const data2 = await procesoRegistroIngresoProyecto({
          sesion: true,
          idSession: infoUsuario.idPersona,
          idProyecto: infoTarea.item.idProyecto,
          fecha: fechaActual,
        });
        console.log(JSON.stringify(data2));
      }
    }

    // Si la infoTarea no es un recordatorio default
    if (infoTarea.item.idRecordatorio != null) {
      const data = await actualizarRecordatorios({
        sesion: true,
        idSesion: infoUsuario.idPersona,
        descripcion: infoTarea.item.descripcion,
        fechaInicio: infoTarea.item.fechaInicio,
        fechaFin: infoTarea.item.fechaFin,
        estado: estadoTarea ? "Activo" : "Terminado",
        idRecordatorio: infoTarea.item.idRecordatorio,
      });
    }
    setEstadoTarea(!estadoTarea);
    actualizarLista();
  };

  /**
   * Return del componente
   */
  return (
    <View style={[StylesTarea.container]}>
      {/* Modal que muestra información */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <AlertModalInfoTareas
          onPress={() => setModalVisible(!modalVisible)}
          informacion={infoTarea.item}
          titulo={`Información ${
            infoTarea.item.idRecordatorio === undefined
              ? "Tarea"
              : "Recordatorio"
          }`}
          textBtn={"OK"}
          colorBtnOcultar="pink"
          colorFondoModal="#afafaf70"
          altura="80%"
        />
      </Modal>

      {/* Condición para habiltar el icono de exclamación según su fecha fin (atrasada)*/}
      {atrasada ? (
        <Image
          style={[
            { width: 10, height: 35, marginRight: 5, resizeMode: "contain" },
          ]}
          source={require("../assets/icons/exclamacion.png")}
        />
      ) : (
        <View></View>
      )}

      {/* Información del Item*/}
      <TouchableOpacity
        style={[atrasada ? { width: "75%" } : StylesTarea.containerInfo]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={StylesTarea.titulo}>{infoTarea.item.descripcion}</Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {infoTarea.item.fechaFin.slice(0, 16)}
          </Text>

          <Text
            style={[
              StylesTarea.hora,
              StylesTarea.etiqueta,
              {
                backgroundColor:
                  infoTarea.item.idActividad === undefined
                    ? "#F56783"
                    : "#a197ff",
                color: "white",
              },
            ]}
          >
            #{" "}
            {infoTarea.item.idActividad === undefined
              ? "Recordatorio"
              : "Actividad"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* BouncyCheckbox que Activa o Termina una actividad */}
      <View style={[StylesTarea.containerCheckBox]}>
        <BouncyCheckbox
          onPress={() => {
            actualizaEstado();
          }}
          size={38}
          fillColor="#B3B3B3"
          isChecked={estadoTarea}
        />
      </View>
    </View>
  );
};

export default Tarea;
