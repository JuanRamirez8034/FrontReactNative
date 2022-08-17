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
   StylesConsultaMovimientos
 } from "./styles/Styles";
 import EgresoItem from "./EgresoItem";
 
 /**
  * Funcion principal de la Lista Movientos Items
  */
 const ListaEgresosItems = ({
   datas,
   navegar
 }) => {
   
 
   /**
    * Función que dibuja cada elemento pasado a traves del llamado del flatList
    */
   const dibujarItems = ({ item }) => {
     return (
       <EgresoItem
         motivo={item.motivo}
         monto={item.monto}
         fecha={item.fecha}
         id={item.idEgreso}
         navegar={navegar}
       />
     );
   };
 
   /**
    * Return del componente
    */
   return (
     <View style={[StylesListaTareas.container, { height: "44%" }]}>
 
       {/* ListaMovientosItem */}
       <FlatList
         data={datas}
         keyExtractor={(item) => {
           return item.fecha + "_" + Math.random() + Math.random();
         }}
         renderItem={dibujarItems}
        //  refreshControl={
        //    <RefreshControl
        //      refreshing={estadoActualizar}
        //      onRefresh={actualizarActiva}
        //      colors={["white"]}
        //      progressBackgroundColor="#97e5d0"
        //    />
        //  }
       />
     </View>
   );
 };
 
 export default ListaEgresosItems;
 