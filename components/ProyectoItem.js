/**
 * Componente del Item de Proyecto
 */
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { StylesTarea } from "./styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { eliminarProyectos } from "../requestBackend/API-Proyectos";
import ModalInfo from "./ModalInfo";
import ModalAlert from "./ModalAlert";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";

/**
 * Funcion principal del Item de Proyecto
 */
const Proyecto = ({ infoProyecto, navegar, actualizar }) => {
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
   * Función para eliminar proyecto por id
   */
  const eliminarProyecto = async (id) => {
    console.log("la id del proyecto es ", id);
    const data = await eliminarProyectos({
      sesion: true,
      idSession: infoUsuario.idPersona,
      idProyecto: id,
    });
    if (data.affectedRows != 0) {
      console.log("idProyecto", id);
      console.log(data);
      actualizar();
    }
  };

  /**
   * Return del componente
   */
  return (
    <View style={[StylesTarea.container, { borderTopWidth: 0 }]}>
      {/* Modal que te acceder a las actividades dentro del proyecto */}
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
          informacion={infoProyecto.item}
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
          infoProyecto.item.idProyecto === 0 &&
          infoProyecto.item.persona_idPersona === undefined
            ? setInfo({
                titulo: "Alerta",
                subTitulo: "Proyecto invalido",
                parrafo: "Esto no es un proyecto ¡Cree uno!",
              })
            : navegar.navigate("Actividades", {
                idProyecto: infoProyecto.item.idProyecto,
              });
        }}
      >
        <Text style={[StylesTarea.titulo, { color: "#666666", fontSize: 17 }]}>
          # {infoProyecto.item.descripcion}
        </Text>

        <View style={StylesTarea.containerFlex}>
          <Text style={StylesTarea.hora}>
            {infoProyecto.item.fechaFin.slice(0, 10) +
              " " +
              infoProyecto.item.fechaFin.slice(11, 16)}
          </Text>

          <Text style={StylesTarea.hora}>{infoProyecto.item.estado}</Text>
        </View>
      </TouchableOpacity>

      {/* Boton que te muestra la info para editar */}
      <TouchableOpacity
        onPress={() => {
          infoProyecto.item.idProyecto === 0 &&
          infoProyecto.item.persona_idPersona === undefined
            ? setInfo({
                titulo: "Alerta",
                subTitulo: "Proyecto invalido",
                parrafo: "Esto no es un proyecto ¡No se puede editar!",
              })
            : setModalVisible(!modalVisible);
        }}
      >
        <Image
          source={require("../assets/icons/Detalles_1.png")}
          style={[{ height: 27, width: 27, marginRight: 7 }]}
        />
      </TouchableOpacity>

      {/* Condición para habiltar la opción "Eliminar" según el estado de la Actividad*/}
      {infoProyecto.item.estado !== "Terminado" ? (
        <TouchableOpacity
          onPress={() => {
            infoProyecto.item.idProyecto === 0 &&
            infoProyecto.item.persona_idPersona === undefined
              ? setInfo({
                  titulo: "Alerta",
                  subTitulo: "Proyecto invalido",
                  parrafo: "Esto no es un proyecto ¡No se puede borrar!",
                })
              : eliminarProyecto(infoProyecto.item.idProyecto);
          }}
        >
          <Image
            source={require("../assets/icons/trash.png")}
            style={[
              { width: 25, height: 25, resizeMode: "contain", marginRight: 7 },
            ]}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={[
            { width: 25, height: 25, resizeMode: "contain", marginRight: 7 },
          ]}
        ></View>
      )}

      {/**Modal alert */}
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

export default Proyecto;
