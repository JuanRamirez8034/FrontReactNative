/**
 * Componente del Alert Modal Info Tareas para mostrar alertas de información
 */

import React from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { styles, StylesModal } from "./styles/Styles";

/**
 * Funcion principal del Alert Modal Info Tareas
 */

const AlertModalInfoTareas = ({
  onPress,
  informacion,
  colorBtnOcultar,
  textBtn,
  titulo,
  colorFondoModal,
  altura,
}) => {
    
  /**
   * Return del componente
   */
  return (
    <View
      style={[
        StylesModal.container,
        {
          backgroundColor:
            colorFondoModal === undefined ? "#AAAAAA50" : colorFondoModal,
        },
      ]}
    >
      <View
        style={[
          StylesModal.containerCuerpo,
          {
            height:
              altura === undefined
                ? StylesModal.containerCuerpo.height
                : altura,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            StylesModal.botonCerrar,
            {
              backgroundColor:
                colorBtnOcultar === undefined ? "orange" : colorBtnOcultar,
            },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.textlogo, { fontWeight: "600" }]}>
            {textBtn === undefined ? "OCULTAR" : textBtn}
          </Text>
        </TouchableOpacity>
        <Text style={[StylesModal.titulo]}>{titulo}</Text>
        <View style={[StylesModal.cuerpoInformacion]}>
          <ScrollView>
            <Text style={[StylesModal.subtitulo]}>Tipo:</Text>
            <Text style={[StylesModal.textoInfo]}>
              {informacion.idActividad === undefined
                ? "Recordatorio"
                : "Actividad"}
            </Text>
            <Text style={[StylesModal.subtitulo]}>Descripción:</Text>
            <Text style={[StylesModal.textoInfo]}>
              {informacion.descripcion}
            </Text>
            <Text style={[StylesModal.subtitulo]}>Estado:</Text>
            <Text style={[StylesModal.textoInfo]}>{informacion.estado}</Text>
            <Text style={[StylesModal.subtitulo]}>Fecha inicio:</Text>
            <Text style={[StylesModal.textoInfo]}>
              {informacion.fechaInicio}
            </Text>
            <Text style={[StylesModal.subtitulo]}>Fecha fin:</Text>
            <Text style={[StylesModal.textoInfo]}>{informacion.fechaFin}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AlertModalInfoTareas;
