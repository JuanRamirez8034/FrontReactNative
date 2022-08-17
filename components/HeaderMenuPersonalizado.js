/**
 * Componente del Header Menu Personalizado de toda la App
 */

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StylesHome } from "./styles/Styles";
import { nombreDia, nombreMes } from "../fuciones/DiaMesEspanol";

/**
 * Funcion principal del Header Menu Personalizado
 */

const HeaderMenuPersonalizado = ({
  propfecha,
  togleMenu,
  nombreUsuario,
  saludo,
  altura,
}) => {
  const fecha = new Date();

  /**
   * Return del componente
   */
  return (
    <View
      style={[
        StylesHome.header,
        altura === undefined || altura === null ? {} : { height: altura },
      ]}
    >
      {/* Logo */}
      <Image
        style={[StylesHome.logo]}
        source={require("../assets/icons/FreelanceHelper-gris.png")}
      />

      {/* View del saludo y la hamburguesita */}
      <View style={[StylesHome.headerInferior]}>

        {/* Hamburguesita */}
        {togleMenu !== undefined ? (
          <TouchableOpacity
            style={[StylesHome.hamburguesita]}
            onPress={togleMenu}
          >
            <Image
              style={[{ width: "100%", height: "100%" }]}
              source={require("../assets/icons/Hamburguesita.png")}
            />
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}

        {/* Saludo */}
        <View style={[StylesHome.headerInferior_info]}>

          {/* Nombre usuario */}
          <Text style={[StylesHome.saludo]}>
            {saludo === undefined ? "" : saludo + "" + nombreUsuario + "!"}
          </Text>

          {/* Fecha */}
          <Text style={[StylesHome.fechaHora]}>
            {propfecha
              ? `${nombreDia(fecha.getDay())}, ${fecha.getDate()} ${nombreMes(
                  fecha.getMonth()
                )} ${fecha.getFullYear()}`
              : ""}
          </Text>

        </View>

      </View>
    </View>
  );
};

export default HeaderMenuPersonalizado;
