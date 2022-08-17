/**
 * Componente Menu Button (Cada elemento del menu drawer)
 */
import { Text, TouchableOpacity, Image } from "react-native";
import { StylesDrawer } from "./styles/Styles";

/**
 * Funcion principal del Menu Button
 */
const MenuButton = ({ text, OnPress, image }) => {
  /**
   * Return del componente
   */
  return (
    <TouchableOpacity style={StylesDrawer.boton} onPress={OnPress}>
      <Image source={image} style={[StylesDrawer.PNGinput]} />
      <Text style={StylesDrawer.texto}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MenuButton;
