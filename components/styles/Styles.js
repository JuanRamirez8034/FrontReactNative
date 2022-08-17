import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
EStyleSheet.build();

//   Pantallas LOGIN y SINGIN
export const styles = EStyleSheet.create({
  container: {
    height: "100%",
  },
  logo: {
    marginVertical: 20,
    marginTop: "3%",
    width: "100%",
    height: 35,
    resizeMode: "contain",
  },
  TituloPNG: {
    marginTop: 20,
    marginBottom: 20,
    width: Dimensions.get("window").width - 100,
    height: 35,
  },
  containerFrase: {
    flexDirection: "row",
    // flexWrap: 'wrap',
    color: "white",
    justifyContent: "center",
    AlignItems: "center",
    textAlign: "center",
    width: Dimensions.get("window").width,
    marginBottom: 40,
  },
  textlogo: {
    color: "white",
    fontSize: 16,
    // fontWeight: '400' Normal
  },
  puntoPNG: {
    width: 5,
    height: 5,
    marginTop: 10,
  },
  texto: {
    fontSize: 18,
  },
  containerLogin: {
    backgroundColor: "white",
    borderColor: "black",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    // width: Dimensions.get('window').width,
    alignItems: "center",
    flex: 1,
    // justifyContent: 'center',
  },
  containerLogup: {
    backgroundColor: "white",
    borderColor: "black",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    width: Dimensions.get("window").width,
    alignItems: "center",
    flex: 1,
    // justifyContent: 'center',
  },
  lineasup: {
    width: 40,
    height: 20,
    marginTop: 20,
    marginBottom: 50,
    resizeMode: "contain",
  },
  saludo: {
    color: "#666666",
    fontSize: 22,
    alignSelf: "flex-start",
    marginBottom: 50,
    marginLeft: 45,
  },
  containerInput: {
    backgroundColor: "white",
    flexDirection: "row",
    width: Dimensions.get("window").width - 80,
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
    borderColor: "#B3B3B3",
    borderWidth: 1.5,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    fontSize: 16,
    color: "#808080",
  },
  PNGinput: {
    width: 30,
    height: 29,
    marginLeft: 10,
    marginRight: 7,
    marginTop: 10,
  },
  boton: {
    width: Dimensions.get("window").width - 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 4,
    marginBottom: 50,
    height: 50,
  },
  textBoton: {
    fontSize: 18,
    fontWeight: "600",
  },
  registro: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

// Pantalla home organizador y sus elementos
//LIENZO HOME
export const StylesHome = EStyleSheet.create({
  container: {
    backgroundColor: "#ffdd9b",
    //height: Dimensions.get("window").height,
    height: responsiveScreenHeight(100),
  },
  header: {
    backgroundColor: "white",
    height: responsiveScreenHeight(15),
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: responsiveScreenHeight(7),
  },
  logo: {
    marginTop: 13,
    marginBottom: 10,
    width: "100%",
    height: 23,
    resizeMode: "contain",
  },
  headerInferior: {
    alignSelf: "center",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  hamburguesita: {
    marginTop: 8,
    width: 27,
    height: 19,
    marginLeft: 10,
  },
  iconoMenu: {
    width: "100%",
    height: 4,
    marginTop: 5,
    borderRadius: 3,
  },
  headerInferior_info: {
    alignItems: "flex-end",
    paddingRight: 10,
    marginBottom: 10,
  },
  saludo: {
    color: "black",
    fontSize: responsiveScreenFontSize(2.8),
  },
  fechaHora: {
    fontSize: responsiveScreenFontSize(1.8),
    color: "#B3B3B3",
  },
  containerBtnNueva: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    // marginTop: 10,
    // backgroundColor:'#53C4DE',
  },
  botonNueva: {
    width: responsiveScreenWidth(12),
    height: responsiveScreenHeight(5.6),
    alignSelf: "flex-end",
  },
});
// LIENZO LISTA TAREA
export const StylesListaTareas = EStyleSheet.create({
  container: {
    backgroundColor: "white",
    width: Dimensions.get("window").width - 40,
    borderRadius: 20,
    padding: 15,
    // height:((Dimensions.get('window').width) + 90),
    height: responsiveScreenHeight(53),
    alignSelf: "center",
  },
  cabeceraLista: {
    height: "12%",
  },
  tituloCabeceraLista: {
    fontSize: responsiveScreenFontSize(2.6),
    fontWeight: "bold",
    color: "#FEB529",
  },
});
// LIENZO LISTA MOVIMIENTOS
export const StylesListaMovimientos = EStyleSheet.create({
  botonPequeno: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
// LIENZO DE TAREA
export const StylesTarea = EStyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#B3B3B3",
    alignItems: "center",
  },
  containerInfo: {
    width: "80%",
  },
  titulo: {
    fontSize: responsiveScreenFontSize(2.1),
    fontWeight: "bold",
  },
  hora: {
    marginRight: 10,
  },
  containerFlex: {
    flexDirection: "row",
    marginTop: 4,
  },
  containerCheckBox: {
    width: "20%",
    justifyContent: "center",
    paddingLeft: "6%",
  },
  etiqueta: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 6,
    textAlign: "center",
  },
});

// Pantalla perfil y sus elementos
export const StylesPerfil = EStyleSheet.create({
  form: {
    backgroundColor: "white",
    width: Dimensions.get("window").width - 40,
    height: "70%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  containerInput: {
    backgroundColor: "white",
    flexDirection: "row",
    width: Dimensions.get("window").width - 80,
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
    borderColor: "#B3B3B3",
    borderWidth: 1.5,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    fontSize: 16,
    color: "#808080",
  },
  PNGinput: {
    width: 30,
    height: 29,
    marginLeft: 10,
    marginRight: 7,
    marginTop: 10,
  },
  vieweditar: {
    marginTop: 5,
    marginRight: 8,
    alignSelf: "flex-end",
  },
  imgUsuario: {
    width: 90,
    height: 90,
    marginBottom: 40,
  },
  textChangePassword: {
    marginTop: 30,
    fontWeight: "bold",
    color: "#F56783",
  },
  textSaveChange: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "bold",
    color: "white",
  },
  saveChanges: {
    width: Dimensions.get("window").width - 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 4,
    // marginBottom: 50,
    height: 50,
    backgroundColor: "#00CE97",
  },
});
// estilo pantalla modal
export const StylesModal = EStyleSheet.create({
  container: {
    with: "100%",
    height: "100%",
    backgroundColor: "#a197ff80",
    alignItems: "center",
    justifyContent: "center",
  },
  containerCuerpo: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  botonCerrar: {
    width: "100%",
    padding: 12,
    backgroundColor: "#a197ff",
    alignItems: "center",
    borderRadius: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  cuerpoInformacion: {
    backgroundColor: "#b3b3b330",
    borderRadius: 20,
    height: "75%",
    width: "90%",
    padding: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 5,
    marginTop: 8,
  },
  textoInfo: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
  },
});
// seccion de consultar proyectos, actividades, recordatorios, tags .....
export const StylesConsultasOrganizador = EStyleSheet.create({
  logo: {
    marginVertical: 80,
    marginTop: "10%",
    width: "100%",
    height: 26,
    resizeMode: "contain",
  },
  container: {
    backgroundColor: "white",
    borderColor: "black",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    height: Dimensions.get("window").height,
    alignItems: "center",
    // flex: 1,
    // justifyContent: 'center',
  },
});
// seccion de crear recordatorios, tags, actividades .....
export const StylesCrearRecordatorio = EStyleSheet.create({
  container: {
    height: "100%",
  },
  containerFormulario: {
    backgroundColor: "white",
    borderColor: "black",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: "center",
    //flex: 1,
  },
  logo: {
    marginVertical: "20%",
    width: "100%",
    height: 30,
    resizeMode: "contain",
  },
  lineasup: {
    width: 40,
    height: 20,
    marginTop: 20,
    marginBottom: 50,
    resizeMode: "contain",
  },
  containerInput: {
    backgroundColor: "white",
    flexDirection: "row",
    width: Dimensions.get("window").width - 80,
    height: 50,
    marginBottom: 20,
    borderColor: "#B3B3B3",
    borderBottomWidth: 1.5,
  },
  containerInputDoble: {
    width: Dimensions.get("window").width - 80,
    backgroundColor: "white",
    flexDirection: "row",
    flexDirection: "column",
    marginBottom: 20,
  },
  containerInputDual: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 40,
    borderColor: "#B3B3B3",
    borderBottomWidth: 1.5,
  },
  dualInputPNG: {
    width: 27,
    height: 26,
    marginTop: 6,
    marginLeft: 2,
    marginRight: 6,
  },
  inputPNG: {
    width: 23,
    height: 16,
    marginTop: 19,
    marginLeft: 2,
    marginRight: 6,
  },
  inputTitulo: {
    width: "100%",
    color: "#B3B3B3",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    fontSize: 16,
    color: "#808080",
  },
  saludo: {
    color: "#666666",
    fontSize: 28,
    fontWeight: "600",
  },
  containerSaludo: {
    width: "80%",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 40,
    marginTop: 10,
  },
  iconoSaludo: {
    width: 50,
    height: 30,
    marginRight: "4%",
  },
});

// ESTILOS HOME FINANZAS
export const StylesHomeFinanzas = EStyleSheet.create({
  colorFondo: {
    backgroundColor: "#97e5d0",
  },
});
// ESTILOS ELEMENTOS MOSTRAR CIFRAS
export const StylesMostrarCifras = EStyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  containerTitulo: {
    backgroundColor: "#00ce97",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    marginLeft: "5%",
    width: "60%",
    alignItems: "center",
  },
  containerElementosCifras: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderBottomWidth: 4,
    borderColor: "#00ce97",
  },
  containerCifras: {
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
  },
  textTitulo: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
  textCifras: {
    fontSize: 20,
    fontWeight: "800",
    color: "black",
  },
});
// ESILOS CONSULTAR INGRESOS
export const StylesConsultaMovimientos = EStyleSheet.create({
  input: {
    backgroundColor: "white",
    fontSize: 16,
    color: "#808080",
    width: "35%",
    borderBottomWidth: 1,
    borderBottomColor: "#B3B3B3",
    marginLeft: "4%",
    marginRight: "4%",
  },
  containerInputDoble: {
    width: Dimensions.get("window").width - 80,
    backgroundColor: "white",
    flexDirection: "row",
    flexDirection: "column",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputDoble: {
    color: "#B3B3B3",
    fontSize: 20,
    fontWeight: "700",
    paddingTop: 10,
  },
  todoAlto: {
    height: responsiveScreenHeight(100),
  },
});
// estilos DRAWER navigator
export const StylesDrawer = EStyleSheet.create({
  scroll: {
    height: "100%",
    backgroundColor: "#ffdd9b",
  },
  drawerscroll: {
    backgroundColor: "#ffdd9b",
  },
  view: {
    flex: 1,
    backgroundColor: "#ffdd9b",
    justifyContent: "space-between",
    height: "12%",
  },
  menu: {
    marginTop: -250,
    height: "36%",
  },
  exit: {
    backgroundColor: "white",
    height: "12%",
  },
  imageView: {
    backgroundColor: "#ffdd9b",
    marginTop: -5,
    height: "5%",
  },
  PNGinput: {
    width: 50,
    height: 29,
    marginLeft: 10,
    marginRight: 7,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },

  texto: {
    width: "50%",

    marginLeft: 10,
    marginRight: "10%",
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 3,
    // borderBottomWidth:1,
    // borderBottomColor:'#B3B3B3'
  },
  containerHeader: {
    backgroundColor: "white",
    height: 72,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "white",
    height: "15%",
  },
  logo: {
    marginTop: 20,
    width: "100%",
    height: 30,
    resizeMode: "contain",
  },
});
