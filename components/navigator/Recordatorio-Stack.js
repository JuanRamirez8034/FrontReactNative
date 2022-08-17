/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica del menu de navegacion por stacks de recordatorios
 * contiene las rutas para acceder a las secciones de ver y crear recordatorios
 */
import React from "react";
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CrearRecordatorio from "../../screens/CrearRecordatorio";
import ConsultaRecordatorios from "../../screens/ConsultaRecordatorios";

const Stack = createNativeStackNavigator();

const RecordatorioStack =(props)=>{
    return(
      // contenedor del navegador stack
      <Stack.Navigator
          initialRouteName='Recordatorios'
        >
          {/* Pantalla 1 */}
          <Stack.Screen
            name='Recordatorios'
            component={ConsultaRecordatorios}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              // headerShown: false,
            }}
          />
          {/* Pantalla 2 */}
          <Stack.Screen
            name='CrearRecordatorio'
            component={CrearRecordatorio}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              headerTintColor:'white',
              // headerShown: false,
            }}
          />
        </Stack.Navigator>
    );
}
 
export default RecordatorioStack;