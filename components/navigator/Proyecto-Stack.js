/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica del menu de navegacion por stacks de proyecto
 * contiene las rutas para acceder a las secciones de consulta y crear proyectos y actividades
 */
import React from "react";
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CrearProyecto from "../../screens/CrearProyecto";
import CrearActividad from "../../screens/CrearActividad";
import ConsultaProyectos from "../../screens/ConsultaProyectos";
import ConsultaActividades from "../../screens/ConsultaActividades";

const Stack = createNativeStackNavigator();

const ProyectoStack =(props)=>{
    return(
      // contenedor navegador por stack
      <Stack.Navigator
          initialRouteName='Proyectos'
        >
          {/* Pantalla 1 */}
          <Stack.Screen
            name='Proyectos'
            component={ConsultaProyectos}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              // headerShown: false,
            }}
          />
          {/* Pantalla 2 */}
          <Stack.Screen
            name='CrearProyecto'
            component={CrearProyecto}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              headerTintColor:'white',
              // headerShown: false,
            }}
          />
          {/* Pantalla 3 */}
          <Stack.Screen
            name='Actividades'
            component={ConsultaActividades}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              headerTintColor:'white',
              // headerShown: false,
            }}
          />
          {/* Pantalla 4 */}
           <Stack.Screen
            name='CrearActividad'
            component={CrearActividad}
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
 
export default ProyectoStack;