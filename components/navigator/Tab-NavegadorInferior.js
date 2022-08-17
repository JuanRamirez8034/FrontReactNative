/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica del menu de navegacion por pestañas
 * inferior
 */
import React from "react";
import { StyleSheet, View,Text, Image} from 'react-native';
import { createBottomTabNavigator,useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import NavegadorOrganizador from './Drawer-NavegadorOrganizador';
import NavegadorFinanzas from "./Drawer-NavegadorFinanzas";
import HomePerfil from '../../screens/HomePerfil';
import ContextUsuario from '../../Context/ContextUsuario';
const Tab = createBottomTabNavigator();



const NavegadorInferior = (props)=>{
   
    return(
        // Proveedor de la informacion del usuario
        <ContextUsuario.Provider value={props.route.params.datosUsuario}>
            {/* Contenedor del navegador de pestañas inferiores */}
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({route})=>({
                    
                    tabBarActiveTintColor:'#FEB529',
                    //funcion para cambiar los iconos del menu inferior
                    tabBarIcon: ({focused}) =>{
                        let iconoElement ='';
                        let organizadorIco = false;
                        let perfilIco = false;
                        switch (route.name) {
                            case 'Home':
                                iconoElement = focused ? require('../../assets/icons/Menu-organizador-color.png') : require('../../assets/icons/Menu-organizador.png');
                                organizadorIco = true;
                                break;
                            case 'Finanzas':
                                iconoElement = focused ? require('../../assets/icons/Menu-Finanzas-color.png') : require('../../assets/icons/Menu-Finanzas.png');
                                break;
                            case 'Perfil':
                                iconoElement = focused ? require('../../assets/icons/Menu-Perfil-color.png') : require('../../assets/icons/Menu-Perfil.png'); perfilIco = true;
                                break;
                            default:
                                break;
                        }
                        return(<Image source={iconoElement} style={[StylesNavInferior.iconoSeccion, organizadorIco ? {height:29, width:24 } : {}, perfilIco ? {width:31} : {} ]}/>);
                    }
                })
                
                }
            >   
                {/* Pantalla 1 */}
                <Tab.Screen
                    name='Home'
                    component={NavegadorOrganizador}
                    options={{
                        headerShown:false,
                        title:"Organizador",
                    }}
                />
                {/* Pantalla 2 */}
                <Tab.Screen
                    name='Finanzas'
                    component={NavegadorFinanzas}
                    options={{
                        headerShown:false,
                        title:"Finanzas",
                    }}
                />
                {/* Pantalla 3 */}
                <Tab.Screen
                    name='Perfil'
                    component={HomePerfil}
                    options={{
                        headerShown:false,
                        title:"Perfil",
                    }}
                />
                
            </Tab.Navigator>
        </ContextUsuario.Provider>
    );
}

export const StylesNavInferior = StyleSheet.create({
    iconoSeccion:{
        width: 30,
        height: 31,
    }
});

export default NavegadorInferior;