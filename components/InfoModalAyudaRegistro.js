/**
 * Componente del Info Modal Ayuda Registro
 */
import React from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { styles, StylesModal } from "./styles/Styles";

/**
 * Funcion principal del Icono Nuevo Azul
 */
const InfoModalAyudaRegistro = ({ onPress }) => {
  
  /**
   * Return del componente
   */
  return (
    <View style={[StylesModal.container]}>
      <View style={[StylesModal.containerCuerpo]}>
        <TouchableOpacity style={[StylesModal.botonCerrar]} onPress={onPress}>
          <Text style={[styles.textlogo, { fontWeight: "600" }]}>OCULTAR</Text>
        </TouchableOpacity>
        <Text style={[StylesModal.titulo]}>Ayuda sobre el registro</Text>
        <View style={[StylesModal.cuerpoInformacion]}>
          <ScrollView>
            <Text style={[StylesModal.subtitulo]}>Campos vacios</Text>
            <Text style={[StylesModal.textoInfo]}>
              - No se permiten campos vacios para el registro, todos los campos
              son obligatorios
            </Text>
            <Text style={[StylesModal.subtitulo]}>Nombre y apellido</Text>
            <Text style={[StylesModal.textoInfo]}>
              - Puede contener cualquier caracter alfabetico {"\n"}- No se puede
              agregar caracteres numericos {"\n"}- No puede agregar caracteres
              especiales
            </Text>
            <Text style={[StylesModal.subtitulo]}>Usuario</Text>
            <Text style={[StylesModal.textoInfo]}>
              - Puede contener cuaquier caracter alfanumerico{"\n"}- Puede
              contener cuaquier caracter alfanumerico{"\n"}- Longitud maxima de
              20 caracteres
            </Text>
            <Text style={[StylesModal.subtitulo]}>Fechas</Text>
            <Text style={[StylesModal.textoInfo]}>
              - La fecha debe comprender el formato {"(AAAA-MM-DD)"} y puede
              utilizar como sepador los siguientes caracteres {'("." "-" "/")'}
            </Text>
            <Text style={[StylesModal.subtitulo]}>Correo</Text>
            <Text style={[StylesModal.textoInfo]}>
              - El correo debe contener un formato valido a "
              {"ejemplo@nombreDominio.com"}"
            </Text>
            <Text style={[StylesModal.subtitulo]}>Contraseña</Text>
            <Text style={[StylesModal.textoInfo]}>
              - Minima Longitud de 7 caracteres{"\n"}- Maxima longitud 30
              carateres{"\n"}- Minimo una MAYUSCULA{"\n"}- Minimo una minuscula
              {"\n"}- Minimo un numero {"(0-9)\n"}- Minimo un caracter especial{" "}
              {"(!·$%&*#.-_)"}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default InfoModalAyudaRegistro;
