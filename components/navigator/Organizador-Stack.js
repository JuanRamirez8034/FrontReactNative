import React from "react";
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CrearProyecto from "../../screens/CrearProyecto";
import ConsultaProyectos from "../../screens/ConsultaProyectos";

const Stack = createNativeStackNavigator();

const OrganizadorStack =(props)=>{
    return(
      <Stack.Navigator
          initialRouteName='Proyectos'
        >
          <Stack.Screen
            name='Proyectos'
            component={ConsultaProyectos}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
            }}
          />
          <Stack.Screen
            name='CrearProyecto'
            component={CrearProyecto}
            options={{
              headerStyle:{backgroundColor:'#FFDD9B'},
              headerTitle:'',
              headerTintColor:'white',
            }}
          />
        </Stack.Navigator>
    );
}
 
export default OrganizadorStack;