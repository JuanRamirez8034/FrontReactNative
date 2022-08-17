/**
 * Componente de Mostrar Cifra
 */
import { View, Text } from "react-native";
import { StylesMostrarCifras } from "./styles/Styles";
import React from "react";

/**
 * Funcion principal de Mostrar Cifra
 */
const MostrarCifra = ({ titulo, monto, moneda, estilos }) => {

  /**
   * Return del componente
   */
  return (
    <View
      style={[
        StylesMostrarCifras.container,
        estilos === undefined ? {} : estilos,
      ]}
    >
      {/* Titulo */}
      <View style={[StylesMostrarCifras.containerTitulo]}>
        <Text style={[StylesMostrarCifras.textTitulo]}>
          {titulo === undefined || titulo === null ? "Nombre Campo" : titulo}
        </Text>
      </View>

      {/* Cifra */}
      <View style={[StylesMostrarCifras.containerElementosCifras]}>
        <View style={[StylesMostrarCifras.containerCifras]}>
          <Text style={[StylesMostrarCifras.textCifras]}>
            {monto === undefined || monto === null ? "0.00" : monto}
          </Text>
          <Text style={[StylesMostrarCifras.textCifras, { marginLeft: 4 }]}>
            {moneda === undefined || moneda === null ? "USD" : moneda}
          </Text>
        </View>
      </View>
      
    </View>
  );
};

export default MostrarCifra;
