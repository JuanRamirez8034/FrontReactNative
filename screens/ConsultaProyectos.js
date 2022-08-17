/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de  consulta proyectos
 */
import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import {
  StylesConsultasOrganizador,
  styles,
  StylesHome,
} from "../components/styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ListaProyectosItems from "../components/ListaProyectosItems";

const ConsultaProyectos = (props) => {

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
        <View style={[{ flexDirection: "row", width: '80%', justifyContent: 'space-between' }]}>
          {/* Titulo */}
          <View style={[{ flexDirection: "row", alignSelf: "center" }]}>
            <Image
              style={[
                { alignSelf: "center", height: 27, width: 37, marginRight: 8 }
              ]}
              source={require("../assets/icons/Icon-proyecto-color.png")}
            />
            <Text style={{ fontSize: 23, fontWeight: '500', color: '#666666' }}>Proyectos</Text>
          </View>
          {/* Boton azul */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CrearProyecto")}
          >
            <Image
              style={[StylesHome.botonNueva, { height: 32, width: 32, alignSelf: "center", margin: 0 }]}
              source={require("../assets/icons/plus.png")}
            ></Image>
          </TouchableOpacity>
        </View>


        <View style={[StylesHome.containerBtnNueva]}>

        </View>

        <ListaProyectosItems
          navegar={props.navigation}
        // estadoActualizar={estadoActualizar}
        // setEstadoActualizar={setEstadoActualizar}
        // datas={dataProyectos}
        // accionarConsulta={obtenerProyectos}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConsultaProyectos;
