/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica del menu de navegacion por stacks
 * contiene las rutas para las pantallas de login, logup y principal para acceder a
 * las secciones internas de la aplicacion "organizador"
 */
import React from "react";
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Logup from "../../screens/Logup";
import Login from "../../screens/Login"
import NavegadorInferior from "./Tab-NavegadorInferior";

const Stack = createNativeStackNavigator();

const NavegadorStack =(props)=>{
    return(
      // contendeor del navegador por stack, Login, logup, organizador
      <Stack.Navigator
          initialRouteName='Login'
        >
          {/* Pantalla 1 */}
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerStyle:{backgroundColor:'#F56783'},
              headerTitle:'',
            }}
          />
          {/* Pantalla 2 */}
          <Stack.Screen
            name='Logup'
            component={Logup}
            options={{
              headerStyle:{backgroundColor:'#a197ff'},
              headerTitle:'',
              headerTintColor:'white',
            }}
          />
          {/* Pantalla 3 */}
          <Stack.Screen
            name='Organizador'
            component={NavegadorInferior}
            options={{
              headerStyle:{backgroundColor:'#a197ff'},
              headerTitle:'',
              headerTintColor:'white',
              headerShown:false,
            }}
          />
        </Stack.Navigator>
    );
}
 
export default NavegadorStack;