/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica del menu de navegacion por cajas "drawer" del organizador
 * contiene las rutas para acceder a las secciones  proyecto, recordatorio y actividad
 */
import { View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { StylesDrawer } from "../styles/Styles";
import MenuDrawer from "../../components/MenuDrawer";
import MenuButton from "../../components/MenuButton";
import HomeOrganizador from "../../screens/HomeOrganizador";
import CrearActividad from "../../screens/CrearActividad";
import ProyectoStack from "./Proyecto-Stack";
import RecordatorioStack from "./Recordatorio-Stack";

const Drawer = createDrawerNavigator();

/**
 * Funcion que contiene la parte grafica del menu con sus botones respectivos
 */
const Menu = ({ navigation }) => {
  return (
    <DrawerContentScrollView contentContainerStyle={StylesDrawer.scroll}>
      <View style={StylesDrawer.view}>
        <View style={StylesDrawer.imageView}>
          <MenuDrawer
          // title={"FreeLanceHelper"}
          />
        </View>
        <View style={StylesDrawer.menu}>
          <MenuButton
            text="Recordatorios"
            OnPress={() => navigation.navigate("RecordatorioStack")}
            image={require("../../assets/icons/Icon-recordatorio-color.png")}
          />

          <MenuButton
            text="Proyectos"
            OnPress={() => navigation.navigate("ProyectoStack")}
            image={require("../../assets/icons/Icon-proyecto-color.png")}
          />
        </View>
        <View style={StylesDrawer.exit}>
          <MenuButton
            text="Salir"
            OnPress={() => navigation.navigate("Login")}
            image={require("../../assets/icons/Icon-Salir.png")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

/**
 * Funcion que contiene las rutas respectivas para realizar la navegacion
 */
const NavegadorOrganizador = () => {
  return (
    // contenedr del naveagdor drawer
    <Drawer.Navigator
      drawerContent={(props) => <Menu {...props} />}
      screenOptions={{
        headerShown: true,
        swipeEnabled: true,
        headerStyle: {
          backgroundColor: "white",
          height: 80,
        },
        headerTintColor: "#B3B3B3",
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: "bold",
        },
        drawerPosition: "left",
        drawerType: "front",
        overlayColor: "#AAAAAA80",
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      {/* Pantalla 1 */}
      <Drawer.Screen name="HomeOrganizador" component={HomeOrganizador} />
      {/* Pantalla 2 */}
      <Drawer.Screen name="RecordatorioStack" component={RecordatorioStack} />
      {/* Pantalla 3 */}
      <Drawer.Screen name="ProyectoStack" component={ProyectoStack} />
      {/* Pantalla 4 */}
      <Drawer.Screen name="CrearActividad" component={CrearActividad} />
    </Drawer.Navigator>
  );
};

export default NavegadorOrganizador;
