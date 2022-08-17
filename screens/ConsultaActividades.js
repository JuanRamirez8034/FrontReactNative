/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de  consulta actividades
 */
import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import {
  StylesConsultasOrganizador,
  styles,
  StylesHome,
} from "../components/styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ListaActividadesItems from "../components/ListaActividadesItems";

const ConsultaActividades = (props) => {

  return (
    <SafeAreaView style={[{ backgroundColor: "#FFDD9B" }, styles.container]}>
      {/* <StatusBar translucent={true} backgroundColor="#FFDD9B" /> */}
      {/* Logo */}
      <Image
        style={StylesConsultasOrganizador.logo}
        source={require("../assets/icons/FreelanceHelper-gris.png")}
      />

      {/* Contenedor del form */}
      <View style={[StylesConsultasOrganizador.container]}>
        <Image
          style={[styles.lineasup, { marginBottom: 0, alignSelf: "center" }]}
          source={require("../assets/icons/Linea-sup.png")}
        />
        {/* Titulo + boton */}
        <View
          style={[
            {
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-between",
              marginTop: 20,
            },
          ]}
        >
          {/* Titulo */}
          <View style={[{ flexDirection: "row", alignSelf: "center" }]}>
            <Image
              style={[
                { alignSelf: "center", height: 32, width: 30, marginRight: 8 },
              ]}
              source={require("../assets/icons/Actividad.png")}
            />
            <Text style={{ fontSize: 23, fontWeight: "500", color: "#666666" }}>
              Actividades
            </Text>
          </View>
          {/* Boton azul */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CrearActividad")}
          >
            <Image
              style={[
                StylesHome.botonNueva,
                { height: 32, width: 32, alignSelf: "center", margin: 0 },
              ]}
              source={require("../assets/icons/plus.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={[StylesHome.containerBtnNueva]}></View>

        <ListaActividadesItems
          idProyecto={props.route.params.idProyecto}
        // estadoActualizar={estadoActualizar}
        // setEstadoActualizar={setEstadoActualizar}
        // datas={dataProyectos}
        // accionarConsulta={obtenerProyectos}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConsultaActividades;
