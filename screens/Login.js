/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de inicio de sesion
 */
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "../components/styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { inicioSesion } from "../requestBackend/API-Usuarios";
import { consultaAllDatosPersona } from "../requestBackend/API-Personas";
import { useTogglePasswordVisibility } from "../components/useToggle";
import { validarContrasena } from "../fuciones/validador";
import ModalAlert from "../components/ModalAlert";

const Login = (props) => {
  /**
   * Declaracion de los estados correspondientes
   */
  // Estado para almacenar el usauario
  const [usuario, cargarUsuario] = useState("");
  // Estado para almacenar la contraseña
  const [contrasena, cargarContrasena] = useState("");
  // Estado para utilizar la modal "ModalAlert" (hacer visible)
  const [visual, setVisual] = useState(false);
  // Estado para almacenar los datos del usuario para pasarlo al context
  const [datosUsuario, setDatosUsuario] = useState({});
  // Estado para utilizar la modal "ModalAlert" (Informacion del modal)
  const [info, setInfo] = useState({"subTitulo":"", "parrafo":""});
  // Funcion para cargar el estado del icono del campo contraseña
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();

  /**
   * Efecto para llamar a la modal cada vez que hayan cambios en el contenido
   * del estado info
   */
  useEffect(()=>{
    if(info.subTitulo==="" || info.parrafo ===""){return}
    setVisual(true);
  },[info]);

  /**
   * Funcion para restablecer todos los estados al estado inicial
   */
  const restablecerCampos = () =>{
    setInfo({"subTitulo":"", "parrafo":""});
    cargarUsuario("");
    cargarContrasena("");
    setVisual(false);
    handlePasswordVisibility(true);
  }

  /**
   * Funcion para pasar a la pantalla de home,
   * solo se ejecuta cuando el valor de datosUsuario
   */
  useEffect(() => {
    if(JSON.stringify(datosUsuario) === "{}") return;
    console.log(JSON.stringify(datosUsuario));
    props.navigation.navigate("Organizador", { datosUsuario });
    restablecerCampos();
  }, [datosUsuario]);

  /**
   * Función para realizar el proceso de consulta y verificación
   * de datos de inicio de sesión
   */
  const solicitudLogin = async () => {
    const datos = {
      usuario: usuario,
      contrasena: contrasena,
    };
    const dataUsuario = await inicioSesion(datos);
    if (dataUsuario.respuesta === undefined) {
      // console.log(data);
      obtenerDatosPersona(dataUsuario.persona_idPersona);
      return;
    }
    setInfo({"subTitulo":"Error de datos", "parrafo":dataUsuario.respuesta});
    console.log("login dice: "+JSON.stringify(dataUsuario));
  };

  /**
   * Función para obtener los datos de la persona y almacenarla
   * en el estado "dataPersona" para enviarlo al context
   */
  const obtenerDatosPersona = async (idPersona) => {
    const dataPersona = await consultaAllDatosPersona({
      sesion: true,
      idSession: idPersona,
    });
    console.log(dataPersona);
    setDatosUsuario(dataPersona);
  };

  /**
   * Función para validar los datos ingresados en los input
   * antes de realizar operaciones con estos
   */
  const validarCampos = () => {
    if (usuario === "" || usuario === null) {
      setInfo({"subTitulo":"Usuario invalido", "parrafo":"El campo usuario no puede estar vacio"});
      return;
    }
    let resultado = validarContrasena(contrasena);
    if (resultado != true) {
      setInfo({"subTitulo":"Contraseña no permitida", "parrafo":resultado.contrasena});
      return;
    }
    solicitudLogin();
  };
  
  return (
    <ScrollView>
      <SafeAreaView style={[{ backgroundColor: "#F56783" }, styles.container]}>
        <StatusBar translucent={true} backgroundColor="#F56783" />
        {/* Logo */}
        <Image
          style={styles.logo}
          source={require("../assets/icons/Logo-sup.png")}
        />
        {/* Contenedor del texto del logo */}
        <View style={styles.containerFrase}>
          <Text style={styles.textlogo}>registrate </Text>
          <Image
            source={require("../assets/icons/Punto.png")}
            style={styles.puntoPNG}
          />
          <Text style={styles.textlogo}> organizate </Text>
          <Image
            source={require("../assets/icons/Punto.png")}
            style={styles.puntoPNG}
          />
          <Text style={styles.textlogo}> planea</Text>
        </View>
        {/* Contenedor del form */}
        <View style={styles.containerLogin}>
          <Image
            style={[styles.lineasup, { marginBottom: 30 }]}
            source={require("../assets/icons/Linea-sup.png")}
          />

          {/* Saludo */}
          <Text style={styles.saludo}>¡Hola de nuevo!</Text>

          {/*Input field User*/}
          <View style={[styles.containerInput]}>
            <Image
              source={require("../assets/icons/Menu-Perfil.png")}
              style={[styles.PNGinput]}
            />
            <TextInput
              onChangeText={cargarUsuario}
              value={usuario}
              placeholder="usuario / correo"
              style={styles.input}
              placeholderTextColor="#B3B3B3"
            />
          </View>

          {/* campo contraseña*/}
          <View style={styles.containerInput}>
            <Image
              source={require("../assets/icons/clave.png")}
              style={[styles.PNGinput, { height: 34, marginTop: 8 }]}
            />

            <TextInput
              onChangeText={cargarContrasena}
              value={contrasena}
              placeholder="contraseña"
              style={[styles.input, { width: "68%" }]}
              placeholderTextColor="#B3B3B3"
              secureTextEntry={passwordVisibility}
            />
            <TouchableOpacity onPress={handlePasswordVisibility}>
              {
                //mostrar icono tachado
                passwordVisibility ? (
                  <Image
                    source={require("../assets/icons/ojoTachado.png")}
                    style={[
                      styles.PNGinput,
                      { height: 22.5, width: 30, marginTop: 12 },
                    ]}
                  />
                ) : (
                  //mostrar icono normal
                  <Image
                    source={require("../assets/icons/ojoNormal.png")}
                    style={[
                      styles.PNGinput,
                      { height: 22.5, width: 30, marginTop: 12 },
                    ]}
                  />
                )
              }
            </TouchableOpacity>
          </View>

          {/*Button */}
          <TouchableOpacity
            style={[styles.boton,{backgroundColor:"#00CE97" }]}
            onPress={validarCampos}
          >
            <Text style={[styles.textBoton, { color: "white"}]}>Ingresar</Text>
          </TouchableOpacity>

          {/*Seccion de Registro */}
          <View style={styles.registro}>
            <Text style={[styles.texto, { color: "#808080", marginTop: 20 }]}>
              ¿No posees cuenta?
            </Text>

            <TouchableOpacity
              style={[styles.boton, { marginBottom: 100 }]}
              onPress={() => props.navigation.navigate("Logup")}
            >
              <Text style={[styles.textBoton, { color: "#a197ff" }]}>
                REGÍSTRATE
              </Text>
            </TouchableOpacity>
          </View>

          {/**modal */}
          <ModalAlert
            VisibleModal={visual}
            setVisibleModal={()=>setVisual(!visual)}
            textTitleModal="Inicio de sesión"
            textSubtilulo={info.subTitulo}
            textParrafo={info.parrafo}
            backgroundColor="#A3A3A380"
            backgroundColorButton="#F56783"
          />

        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
