/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica del menu de navegacion por cajas "drawer" del organizador
 * contiene las rutas para acceder a las secciones  consulta, crear y eliminar egresos
 */
import { createDrawerNavigator, DrawerContentScrollView  } from '@react-navigation/drawer';
import { View } from 'react-native';
import { StylesDrawer, StylesHomeFinanzas } from '../styles/Styles';
import MenuDrawer from "../../components/MenuDrawer";
import MenuButton from '../../components/MenuButton';
import HomeFinanzas from '../../screens/HomeFinanzas';
import ConsultaMovimientos from '../../screens/ConsultaMovimientos';
import CrearEgreso from '../../screens/CrearEgreso';
import EgresoStack from './Egresos-Stack';

const Drawer = createDrawerNavigator();

/**
 * Funcion que contiene la parte grafica del menu con sus botones respectivos
 */
const Menu = ({ navigation }) => {

    return (

        <DrawerContentScrollView
            contentContainerStyle={[StylesDrawer.scroll]}
        >
            <View style={[StylesDrawer.view,StylesHomeFinanzas.colorFondo,]} >
                <View style={StylesDrawer.imageView} >
                    <MenuDrawer
                    // title={"FreeLanceHelper"}                
                    />
                </View>

                <View style={[StylesDrawer.menu, {height:'90%'}]} >
                    <MenuButton
                        text="Movimientos"
                        OnPress={() => navigation.navigate('ConsultaMovimientos')}
                        image={require('../../assets/icons/Billetera.png')}
                    />

                    <MenuButton
                        text="Egresos"
                        OnPress={() => navigation.navigate('EgresosStack')}
                        image={require('../../assets/icons/Egresos.png')}
                    />
                </View>
            </View>

        </DrawerContentScrollView>



    );
}

/**
 * Funcion que contiene las rutas respectivas para realizar la navegacion
 */
const NavegadorFinanzas = ()=>{

    return(
        // contenedor del navegador drawer
        <Drawer.Navigator
            drawerContent={(props)=> <Menu {...props}/>}
            screenOptions={{
                headerShown: true,
                swipeEnabled: true,
                headerStyle:{
                backgroundColor: 'white',
                height: 80
                },
                headerTintColor: '#B3B3B3',
                headerTitleStyle:{
                fontSize:25,
                fontWeight: 'bold',
                },
                drawerPosition: 'left',
                drawerType: 'front',
                overlayColor: "#AAAAAA80",
                headerTitleAlign:'center',
                headerShown: false
            }}
        >
            {/* Pantalla 1 */}
            <Drawer.Screen
                name='HomeFinanzas'
                component={HomeFinanzas}
            />
            {/* Pantalla 2 */}
            <Drawer.Screen
                name='ConsultaMovimientos'
                component={ConsultaMovimientos}
            />
            {/* Pantalla 4 */}
            <Drawer.Screen
                name='EgresosStack'
                component={EgresoStack}
            />
        </Drawer.Navigator>
    );
}

export default NavegadorFinanzas;