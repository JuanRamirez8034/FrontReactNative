/**
 * Componente del Item de Recordatorio
 */

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { StylesTarea } from "./styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { eliminarRecordatorio } from "../requestBackend/API-Recordatorios";
import ModalInfo from "./ModalInfo";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";
import ModalAlert from "./ModalAlert";

/**
 * Funcion principal del Item de Recordatorio
 */
const Recordatorio = ({ infoRecordatorio, actualizar }) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();

  /**
   * Declaración de los estados
   */
  const [modalVisible, setModalVisible] = useState(false);
  //estados para utilizar el ModalAlert
  const [visual, setVisual] = useState(false);
  const [info, setInfo] = useState({ titulo: "", subTitulo: "", parrafo: "" });

  /**
   * UseEffect para llamar el modal
   */
  useEffect(() => {
    // Si viene vacio que no muestre el modal
    if (info.subTitulo === "" || info.parrafo === "" || info.titulo === "") {
      return;
    }
    setVisual(true);
  }, [info]);

  /**
   * UseEffect para limpiar la info del modal al ocultarla
   */
  useEffect(() => {
    // Al cerrar el modal se limpia
    if (visual === false) {
      setInfo({ titulo: "", subTitulo: "", parrafo: "" });
    }
  }, [visual]);

  /**
   * Función para eliminar recordatorio por id
   */
  const eliminarRecordatorios = async (id) => {
    const data = await eliminarRecordatorio({
      sesion: true,
      idSesion: infoUsuario.idPersona,
      idRecordatorio: id,
    });
    if (data.affectedRows != 0) {
      console.log("idActividad", id);
      console.log(data);
      actualizar();
    }
  };

  /**
   * Return del componente
   */
  return (
    <View style={[StylesTarea.container, { borderTopWidth: 0 }]}>
      {/* Modal que muestra alertas/información */}
      <ModalAlert
        VisibleModal={visual}
        setVisibleModal={() => setVisual(!visual)}
        textTitleModal={info.titulo}
        textSubtilulo={info.subTitulo}
        textParrafo={info.parrafo}
        backgroundColor="#A3A3A380"
        backgroundColorButton="#ffdd9b"
      />

      {/* Modal que te permite editar*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalInfo
          onPress={() => {
            setModalVisible(!modalVisible);
            actualizar();
          }}
          informacion={infoRecordatorio.item}
          textBtn={"Cerrar"}
          colorBtnOcultar="pink"
          colorFondoModal="#afafaf70"
          altura={responsiveScreenHeight(70)}
        />
      </Modal>

      {/* Información del Item*/}
      <TouchableOpacity
        style={[StylesTarea.containerInfo]}
        onPress={() => {
          infoRecordatorio.item.idRecordatorio === "00" &&
          infoRecordatorio.item.fechaInicio === "Hoy"
            ? setInfo({
                titulo: "Alerta",
                subTitulo: "Recordatorio inválido",
                parrafo: "Esto no es un recordatorio, ¡cree uno!",
              })
            : setModalVisible(!modalVisible);
        }}
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoRecordatorio.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {infoRecordatorio.item.fechaFin.slice(0, 10) +
              " " +
              infoRecordatorio.item.fechaFin.slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoRecordatorio.item.estado}</Text>
        </View>
      </TouchableOpacity>

      {/* Condición para habiltar la opción "Eliminar" según el estado de la Actividad*/}
      {infoRecordatorio.item.estado !== "Terminado" ? (
        <TouchableOpacity
          onPress={() => {
            infoRecordatorio.item.idRecordatorio === "00" &&
            infoRecordatorio.item.fechaInicio === "Hoy"
              ? setInfo({
                  titulo: "Alerta",
                  subTitulo: "Recordatorio inválido",
                  parrafo: "Esto no es un recordatorio, ¡cree uno!",
                })
              : eliminarRecordatorios(infoRecordatorio.item.idRecordatorio);
          }}
        >
          {/* Logo */}
          <Image
            style={[{ width: 28, height: 28, resizeMode: "contain" }]}
            source={require("../assets/icons/trash.png")}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      
    </View>
  );
};

export default Recordatorio;
