/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de principal de Organizador
 */
import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListaTareasIten from "../components/ListaTareasItems";
import useContextUsuario from "../hook/useContextUsuario";
import { StylesHome } from "../components/styles/Styles";
import IconoNuevo from "../components/IconoNuevo";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";

const HomeOrganizador = (props) => {
  /**
   * Constante que contiene la información del usuario
   * almacenada en el contexto
   */
  const infoUsuario = useContextUsuario();

  return (
    <SafeAreaView style={[StylesHome.container]}>
      <StatusBar backgroundColor="white" />
      {/**Menu Personalizado */}
      <HeaderMenuPersonalizado
        togleMenu={() => props.navigation.openDrawer()}
        saludo="¡Hola, "
        nombreUsuario={infoUsuario.nombrePersona}
        propfecha={true}
      />
      {/*lista de tareas a mostrar */}
      <ListaTareasIten />

      {/*boton azul + */}
      <View style={[StylesHome.containerBtnNueva]}>
        <IconoNuevo navegar={props} />
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default HomeOrganizador;
