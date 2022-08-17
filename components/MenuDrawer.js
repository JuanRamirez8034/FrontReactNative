/**
 * Componente de Menu Drawer
 */
import React from "react";
import { View, Image } from "react-native";
import { StylesDrawer } from "./styles/Styles";

/**
 * Funcion principal del Menu Drawer
 */
const MenuDrawer = () => {

  /**
   * Return del componente
   */
  return (
    <View style={[StylesDrawer.containerHeader]}>
      <Image
        style={[StylesDrawer.logo]}
        source={require("../assets/icons/FreelanceHelper-gris.png")}
      />
    </View>
  );
};
export default MenuDrawer;
