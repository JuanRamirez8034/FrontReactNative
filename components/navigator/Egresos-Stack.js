/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica del menu de navegacion por stacks
 * contiene las rutas para las pantallas de consultar, editar y eliminar egresos
 */
 import React from "react";
 import 'react-native-gesture-handler';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import ConsultaEgresos from "../../screens/ConsultaEgresos";
 import CrearEgreso from "../../screens/CrearEgreso";
 
 const Stack = createNativeStackNavigator();
 
 const EgresoStack =(props)=>{
     return(
       // contendeor del navegador por stack, Login, logup, organizador
       <Stack.Navigator
             initialRouteName='ConsultaEgresos'
             screenOptions={{
                 headerStyle: { backgroundColor: '#97e5d0' },
                 headerTitle: '',
                 headerTintColor: 'white'
             }}
         >
           {/* Pantalla 1 */}
           <Stack.Screen
             name='ConsultaEgresos'
             component={ConsultaEgresos}
           />
           {/* Pantalla 1 */}
           <Stack.Screen
             name='CrearEgreso'
             component={CrearEgreso}
           />
         </Stack.Navigator>
     );
 }
  
 export default EgresoStack;