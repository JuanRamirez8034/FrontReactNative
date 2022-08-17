/**
 * Componente del Icono Nuevo Azul
 */

import React, { useState } from "react";
import { ImageBackground, View, Text, Image } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import { StylesHome } from "./styles/Styles";

/**
 * Funcion principal del Icono Nuevo Azul
 */
const IconoNuevo = ({ navegar }) => {
  /**
   * Elementos necesarios para manejar el menu flotante
   */
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  /**
   * Return del componente
   */
  return (
    // Boton Azul Nuevo
    <ImageBackground
      style={[StylesHome.botonNueva]}
      source={require("../assets/icons/plus.png")}
    >
      {/* Form */}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{ borderRadius: 30, overflow: "hidden", width: 170 }}
        anchor={<Button onPress={openMenu} style={{ marginTop: 13 }}></Button>}
      >
        {/* Título */}
        <View
          style={{
            height: 40,
            width: "100%",
            marginTop: -5,
            alignItems: "center",
            borderBottomWidth: 0.8,
            borderColor: "#B3B3B3",
          }}
        >
          <Image
            style={[StylesHome.iconoMenu, { width: 40, marginBottom: 0 }]}
            source={require("../assets/icons/Linea-sup.png")}
          />
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 2 }}>
            CREAR
          </Text>
        </View>

        <Divider />
        {/* Proyecto */}
        <Menu.Item
          onPress={() => {
            closeMenu();
            navegar.navigation.navigate("ProyectoStack");
          }}
          title="Proyecto"
          icon={() => {
            return (
              <Image
                source={require("../assets/icons/Crear-Proyecto.png")}
                style={{ width: 35, height: 25 }}
              />
            );
          }}
        />

        <Divider />
        {/* Actividad */}
        <Menu.Item
          onPress={() => {
            closeMenu();
            navegar.navigation.navigate("CrearActividad");
          }}
          title="Actividad"
          icon={() => {
            return (
              <Image
                source={require("../assets/icons/Crear-Tarea.png")}
                style={{ width: 27, height: 30, marginLeft: 4 }}
              />
            );
          }}
        />

        <Divider />
        {/* Recordatorio */}
        <Menu.Item
          onPress={() => {
            closeMenu();
            navegar.navigation.navigate("RecordatorioStack");
          }}
          title="Recordatorio"
          icon={() => {
            return (
              <Image
                source={require("../assets/icons/Crear-Recordatorio.png")}
                style={{ width: 27, height: 30, marginLeft: 4 }}
              />
            );
          }}
        />

        <Divider />
      </Menu>

    </ImageBackground>
  );
};

export default IconoNuevo;
