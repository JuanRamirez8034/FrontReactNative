/**
 * Componente de Lista Movientos Items
 */
import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  styles,
  StylesListaTareas,
  StylesListaMovimientos,
} from "./styles/Styles";
import MovimientoItem from "./MovimientoItem";

/**
 * Funcion principal de la Lista Movientos Items
 */
const ListaMovientosItems = ({
  datas,
  setEstadoActualizar,
  estadoActualizar,
  accionarConsulta,
}) => {
  /**
   * Declaración de los estados
   */
  const [fondoColor, setFondoColor] = useState(false);

  /**
   * Función para cambiar el estado al actualizar la lista de tareas
   */
  const actualizarActiva = useCallback(async () => {
    // cargando el estado de refreshing
    setEstadoActualizar(true);
    // ejecutar de forma asincrona la funcion de llamar las tareas
    accionarConsulta("Mensual");
    // cargando el estado de refreshing
    setEstadoActualizar(false);
  });

  /**
   * Función que dibuja cada elemento pasado a traves del llamado del flatList
   */
  const dibujarItems = ({ item }) => {
    //Definir el tipo de movimiento primero
    const tipo = item.idEgreso === undefined ? "Ingreso" : "Egreso";
    return (
      <MovimientoItem
        tipo={tipo}
        motivo={item.motivo}
        monto={item.monto}
        fecha={item.fecha}
      />
    );
  };

  /**
   * Return del componente
   */
  return (
    <View style={[StylesListaTareas.container, { height: "53%" }]}>
        
      {/* Botones */}
      <View
        style={[
          StylesListaTareas.cabeceraLista,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        {/* Flecha + Título */}
        <Image
          source={require("../assets/icons/Flecha-1-finanzas.png")}
          style={[{ width: 24, height: 22, marginRight: "2%" }]}
        />
        <Text
          style={[
            StylesListaTareas.tituloCabeceraLista,
            { color: "#B3B3B3", marginRight: "5%" },
          ]}
        >
          Transacciones
        </Text>

        {/** Botones de rango MES */}
        <TouchableOpacity
          style={[
            StylesListaMovimientos.botonPequeno,
            fondoColor ? coloresFondo.gris : coloresFondo.verde,
          ]}
          onPress={() => {
            accionarConsulta("Mensual");
            setFondoColor(false);
          }}
        >
          <Text style={[styles.textlogo, { fontWeight: "600" }]}>MES</Text>
        </TouchableOpacity>

        {/** Botones de rango AÑO */}
        <TouchableOpacity
          style={[
            StylesListaMovimientos.botonPequeno,
            fondoColor ? coloresFondo.verde : coloresFondo.gris,
          ]}
          onPress={() => {
            accionarConsulta("Anual");
            setFondoColor(true);
          }}
        >
          <Text style={[styles.textlogo, { fontWeight: "600" }]}>AÑO</Text>
        </TouchableOpacity>
      </View>

      {/* ListaMovientosItem */}
      <FlatList
        data={datas}
        keyExtractor={(item) => {
          return item.fecha + "_" + Math.random() + Math.random();
        }}
        renderItem={dibujarItems}
        refreshControl={
          <RefreshControl
            refreshing={estadoActualizar}
            onRefresh={actualizarActiva}
            colors={["white"]}
            progressBackgroundColor="#97e5d0"
          />
        }
      />
    </View>
  );
};

const coloresFondo = StyleSheet.create({
  gris: {
    backgroundColor: "gray",
    marginLeft: 5,
  },
  verde: {
    backgroundColor: "#00ce97",
    marginLeft: 5,
  },
});

export default ListaMovientosItems;
