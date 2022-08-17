/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla principal de la session de finanzas
 */
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useContextUsuario from "../hook/useContextUsuario";
import { StylesHome, StylesHomeFinanzas, styles, StylesConsultaMovimientos, StylesMostrarCifras } from "../components/styles/Styles";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import MostrarCifra from "../components/MostrarCifra";
import { consultaMontoTotalMovimientos } from "../requestBackend/API-Consultas";
import { useIsFocused } from '@react-navigation/native';

const HomeFinanzas = (props) => {
  /**
   * Declaración de estados
   */
  // Estado para almacenar la informacion de los movimientos
  const [infoMontoTotales, setInfoMontoTotales] = useState({ "totalEgresos": "", "totalIngresos": "", "saldo": "", "ahorro": "" });

  /**
   * Constante que identifica la posiscion del usuario entre pantalla
   */
  const isFocus = useIsFocused();

  /**
   * Constante que contiene la información del usuario
   * almacenada en el contexto
   */
  const infoUsuario = useContextUsuario();

  /**
   * Constante con la fecha actual del dispositivo
   */
  const fechaActual = new Date().toISOString().slice(0, 16);

  /**
   * Funcion para traer los cifras desde la bdd
   */
  const obtenerTotalMovimientos = async () => {
    const data = await consultaMontoTotalMovimientos(
      {
        "sesion": true,
        "idSession": infoUsuario.idPersona,
        "fecha": fechaActual
      }
    );
    if (data.totalIngresos !== undefined && data.totalEgresos !== undefined) {
      setInfoMontoTotales(data);
    }
  }

  /**
   * Funcion que se llama cada vez que se accede a la pantalla,
   * para actualizar de forma automatica las cifras al cambiar entre pantallas
   */
  useEffect(() => {
    obtenerTotalMovimientos();
  }, [isFocus]);


  return (
    <ScrollView>
      <SafeAreaView style={[StylesHome.container, StylesHomeFinanzas.colorFondo, StylesConsultaMovimientos.todoAlto, { height: '100%' }]}>
        <StatusBar backgroundColor="white" />
        {/**Menu Personalizado */}
        <HeaderMenuPersonalizado
          //saludo="Bienvenido a Finanzas"
          nombreUsuario={""}
          //togleMenu={() => props.navigation.openDrawer()}
          propfecha={false}
          altura={70}
        />
        {/* </View> */}
        <View style={[{ width: '84%', marginHorizontal: '8%', alignItems: 'center' }]}>

          <MostrarCifra
            titulo={"Saldo"}
            monto={infoMontoTotales.saldo}
            moneda={"USD"}
            estilos={{ marginBottom: 20 }}
          />

          <MostrarCifra
            titulo={"Ingresos Mensuales"}
            monto={infoMontoTotales.totalIngresos}
            moneda={"USD"}
            estilos={{ marginBottom: 20 }}
          />

          <MostrarCifra
            titulo={"Egresos Mensuales"}
            monto={infoMontoTotales.totalEgresos}
            moneda={"USD"}
            estilos={{ marginBottom: 20 }}
          />

          <MostrarCifra
            titulo={"Ahorro"}
            monto={infoMontoTotales.ahorro}
            moneda={"USD"}
            estilos={{ marginBottom: 20 }}
          />

          {/*contendor Button */}
          <View style={[{width:'100%', flexDirection:'row', justifyContent:'space-between', marginBottom:100}]}>
            {/* Consultas movimientos */}
            <TouchableOpacity
              style={[styles.boton, { backgroundColor: '#EF7F9D', width: '45%', marginBottom: 30, marginLeft:'3%' }]}
              onPress={() => props.navigation.navigate("EgresosStack")}
            >
              <Text style={[styles.textBoton, { color: 'white' }]}>Egresos</Text>
            </TouchableOpacity>
            {/* Consulta egresos */}
            <TouchableOpacity
              style={[styles.boton, { backgroundColor: 'orange', width: '45%', marginBottom: 30, marginRight:'3%' }]}
              onPress={() => props.navigation.navigate("ConsultaMovimientos")}
            >
              <Text style={[styles.textBoton, { color: 'white' }]}>Movimientos</Text>
            </TouchableOpacity>
          </View>

          {/**button nuevo egreso */}
          {/* <View style={[StylesMostrarCifras.containerCifras, { marginBottom: 50, justifyContent: 'flex-end', width: '95%' }]}>

            <TouchableOpacity
              style={[{ height: '100%' }]}
              onPress={() => props.navigation.navigate('CrearEgreso')}
            >
              <Image
                style={[{ width: 50, height: 50, resizeMode: 'contain' }]}
                source={require('../assets/icons/plus.png')}
              />
            </TouchableOpacity>

          </View> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeFinanzas;