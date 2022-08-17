/**
 * Componente del Modal Alert (Modales que fungen de alertas)
 */

import { Text, ScrollView, View, TouchableOpacity, Modal } from "react-native";
import { styles, StylesModal } from "./styles/Styles";
import React from "react";

/**
 * Funcion principal del Modal Alert
 */
const ModalAlert = ({
  animationType = "slide",
  transparent = true,
  VisibleModal,
  setVisibleModal,
  textBtnOcultar = "OK",
  textTitleModal = "Titulo",
  textSubtilulo,
  textParrafo,
  alturaCuerpoModal = "60%",
  alturaScrollModal = "65%",
  backgroundColor = "#A3A3A380",
  backgroundColorButton = "#a197ff",
  navegar,
  textBtnNavegar = "¡VAMOS!",
  backgroundColorBtnNavegar = "#a197ff"
}) => {
  /**
   * Return del componente
   */
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={VisibleModal}
      onRequestClose={() => {
        setVisibleModal();
      }}
    >
      {/**contenedor modal */}
      <View
        style={[StylesModal.container, { backgroundColor: backgroundColor }]}
      >
        {/** Cuerpo modal */}
        <View
          style={[StylesModal.containerCuerpo, { height: alturaCuerpoModal }]}
        >
            {/* Boton Cerrar */}
          <TouchableOpacity
            style={[
              StylesModal.botonCerrar,
              { backgroundColor: backgroundColorButton },
            ]}
            onPress={() => setVisibleModal()}
          >
            <Text style={[styles.textlogo, { fontWeight: "600" }]}>
              {textBtnOcultar}
            </Text>
          </TouchableOpacity>

          {/* Boton Ok */}
          {
            navegar!==undefined && navegar !== null && navegar !== "" ? 
            (
                <TouchableOpacity
                  style={[
                    StylesModal.botonCerrar,
                    { backgroundColor: backgroundColorBtnNavegar, marginTop:8 },
                  ]}
                  onPress={() => {setVisibleModal(); navegar();}}
                >
                  <Text style={[styles.textlogo, { fontWeight: "600" }]}>
                    {textBtnNavegar}
                  </Text>
                </TouchableOpacity>
            ):(
              <View></View>
            )
          }

          {/* Titulo Modal */}
          <Text style={[StylesModal.titulo]}>{textTitleModal}</Text>

          {/* Info Modal */}
          <View
            style={[
              StylesModal.cuerpoInformacion,
              { height: alturaScrollModal },
            ]}
          >
            <ScrollView>
              {textSubtilulo !== undefined || textSubtilulo !== null ? (
                <Text style={[StylesModal.subtitulo]}>{textSubtilulo}</Text>
              ) : (
                {}
              )}
              {textParrafo !== undefined || textParrafo !== null ? (
                <Text style={[StylesModal.textoInfo]}>{textParrafo}</Text>
              ) : (
                {}
              )}
            </ScrollView>
          </View>
          
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
