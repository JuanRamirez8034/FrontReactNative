/**
 * Componente del Movimiento Item
 */

import { View, Text, Image } from "react-native";
import React from "react";
import { StylesTarea } from "./styles/Styles";

/**
 * Funcion principal del Movimiento Item
 */
const MovimientoItem = ({ monto, motivo, tipo, fecha }) => {
  //Monto del proyecto solo con dos decimales
  const montoValido = parseFloat(monto).toFixed(2);

  /**
   * Return del componente
   */
  return (
    <View style={[StylesTarea.container, { borderTopWidth: 0 }]}>
      {/**icono transaccion */}
      <Image
        source={
          tipo === "Ingreso"
            ? require("../assets/icons/Ingresos.png")
            : tipo === "Egreso"
            ? require("../assets/icons/Egresos.png")
            : require("../assets/icons/Menu-Finanzas-color.png")
        }
        style={{ width: 40, height: 40, marginLeft: "3%", marginRight: "2%" }}
      />

      {/**informacion de la transaccion */}
      <View style={{ width: "55%", overflow: "hidden" }}>
        <Text style={[{ color: "black", fontSize: 19, fontWeight: "800" }]}>
          {motivo === undefined ? "Titulo trasaccion" : motivo}
        </Text>
        <Text style={[{ fontSize: 15, fontWeight: "500" }]}>
          {fecha !== undefined ? fecha : "0000/00/00"}
        </Text>
      </View>

      {/**Monto de la transaccion */}
      <View
        style={{
          width: "25%",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <Text style={[{ fontSize: 22, fontWeight: "700" }]}>
          ${monto !== undefined ? montoValido.slice(0, -3) : "1000"},
        </Text>
        <Text style={[{ marginBottom: 5 }]}>
          {monto !== undefined ? montoValido.slice(-2, monto.lenght) : "00"}
        </Text>
      </View>
    </View>
  );
};

export default MovimientoItem;
