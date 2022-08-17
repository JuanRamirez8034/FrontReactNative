/**
 * Componente del Item de Actividad
 */

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";
import { StylesTarea } from "./styles/Styles";
import { eliminarActividad } from "../requestBackend/API-Actividad";
import useContextUsuario from "../hook/useContextUsuario";
import ModalInfo from "./ModalInfo";
import ModalAlert from "./ModalAlert";

/**
 * Funcion principal del Item de Actividad
 */
const Actividad = ({ infoActividad, idProyecto, actualizar }) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();

  /**
   * Declaración de los estados
   */
  const [modalVisible, setModalVisible] = useState(false);
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
   * Función para eliminar actividad por id
   */
  const eliminaActividad = async (id) => {
    const data = await eliminarActividad({
      sesion: true,
      idSession: infoUsuario.idPersona,
      idProyecto: idProyecto,
      idActividad: id,
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
          informacion={infoActividad.item}
          textBtn={"Cerrar"}
          colorBtnOcultar="pink"
          colorFondoModal="#afafaf70"
          altura={responsiveScreenHeight(70)}
        />
      </Modal>

      {/* Información del Item*/}
      <TouchableOpacity
        style={[StylesTarea.containerInfo, { marginRight: "9%" }]}
        onPress={() => {
          infoActividad.item.monto === "00.00" &&
          infoActividad.item.idProyecto === "00" &&
          infoActividad.item.idProyecto === "00"
            ? setInfo({
                titulo: "Alerta",
                subTitulo: "Actividad invalida",
                parrafo: "Esto no es una actividad ¡Cree una!",
              })
            : setModalVisible(!modalVisible);
        }}
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoActividad.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {infoActividad.item.fechaFin.slice(0, 10) +
              " " +
              infoActividad.item.fechaFin.slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoActividad.item.estado}</Text>
        </View>
      </TouchableOpacity>

      {/* Condición para habiltar la opción "Eliminar" según el estado de la Actividad*/}
      {infoActividad.item.estado !== "Terminado" ? (
        <TouchableOpacity
          onPress={() => {
            infoActividad.item.monto === "00.00" &&
            infoActividad.item.idProyecto === "00" &&
            infoActividad.item.idProyecto === "00"
              ? setInfo({
                  titulo: "Alerta",
                  subTitulo: "Actividad invalida",
                  parrafo: "Esto no es una actividad ¡No se puede eliminar!",
                })
              : eliminaActividad(infoActividad.item.idActividad);
          }}
        >
          <Image
            source={require("../assets/icons/trash.png")}
            style={[{ width: 30, height: 30, resizeMode: "contain" }]}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

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
    </View>
  );
};

export default Actividad;
