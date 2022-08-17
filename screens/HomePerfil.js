/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla principal de perfil
 */
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import { StylesPerfil } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { Dimensions, Modal, Alert, Vibration } from "react-native";
import PerfilContraseñaModal from "../components/PerfilContraseñaModal";
import { validarDatosRegistroPersona } from "../fuciones/validador";
import { actualizarPerfil } from "../requestBackend/API-Consultas";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

const HomePerfil = (props) => {
  /**
   * Constante que contiene la información del usuario
   * almacenada en el contexto
   */
  const infoUsuario = useContextUsuario();
  /**
   * Declaracion de los estados correspondientes
   */
  // Estado para almacenar nombre
  const [nombrePersona, setNombre] = useState(infoUsuario.nombrePersona);
  // Estado para almacenar usuario
  const [usuario, setUsuario] = useState(infoUsuario.usuario);
  // Estado para almacenar correo
  const [correo, setCorreo] = useState(infoUsuario.correo);
  // Estado para almacenar la informacion del perfil de la persona
  const [perfil, setPerfil] = useState({
    sesion: true,
    idSession: infoUsuario.idPersona,
    nombrePersona: "",
    usuario: "",
    correo: "",
  });
  // Estado almacenar el valor boolean para habilitar o desabilitar TextInput
  const [isEditable, setIsEditable] = useState(false);
  // Estado almacenar el estado de visibilidad del Modal con formulario para editar contraseña
  const [modalVisible, setModalVisible] = useState(false);


  /**
   * Efecto para accionar el proceso de actualizar el usuario
   * una vez los campos esten cargados en el estado correspondiente
   */
  useEffect(() => {
    if (perfil.nombrePersona === "" || perfil.usuario === "" || perfil.correo === "") return;
    handleUpdatePerfil();
    console.log(perfil);
  }, [perfil]);

  /**
   * funcion para verificar datos antes del proceso de actualizacion de
   */
  const validarCampos = () => {
    console.log("Validar campos");
    console.log(nombrePersona);
    // Validar nombrePersona
    let resultado = validarDatosRegistroPersona({
      nombrePersona: nombrePersona,
      usuario: usuario,
      correo: correo,
    });
    if (resultado.result !== true) {
      console.log("Error");
      Alert.alert("Actualización inválida", resultado.alerta, [
        { text: "Entiendo" },
      ]);
      return;
    } else {
      setPerfil({
        ...perfil,
        nombrePersona: nombrePersona,
        usuario: usuario,
        correo: correo,
      });
    }
  };

  /**
   * función para habilitar/desabilitar la edicion
   */
  const enableInputs = () => {
    setIsEditable(!isEditable);
  };

  /**
   * Funcion para realizar el proceso de actualización de perfil
   */
  const handleUpdatePerfil = async () => {
    console.log("handleUpdatePerfil");
    const respuesta = await actualizarPerfil(perfil);
    if (!respuesta.resultado === true) {
      
      //Vibration.vibrate(1500);
      Alert.alert(
        "El perfil no se pudo actualizar",
        `Situacion:\n ${
          respuesta.resultado === undefined
            ? JSON.stringify(respuesta)
            : JSON.stringify(respuesta.resultado)
        }`,
        [{ text: "Entiendo" }]
      );
      // return;
    } else {
      Vibration.vibrate(200);
      Alert.alert("¡Aviso!", "Perfil actualizado con exito", [
        { text: "Entiendo"},
      ]);
      // onPress: () => restablecerCampos()
      // props.navigation.navigate("Organizador", { perfil });
      setIsEditable(false);
    }
  };

  return (
    <ScrollView style={[{ backgroundColor: "#F4B3C2" }]}>
      <SafeAreaView
        style={[
          {
            backgroundColor: "#F4B3C2",
            height: Dimensions.get("window").height,
          },
        ]}
      >
        <StatusBar backgroundColor="white" />
        {/**Menu Personalizado */}
        <HeaderMenuPersonalizado />
        <View style={[StylesPerfil.form]}>
          {/* Editar usuario */}
          <View style={[StylesPerfil.vieweditar]}>
            <TouchableOpacity onPress={() => enableInputs()}>
              <Image
                source={require("../assets/icons/Peril-Editar.png")}
                style={[StylesPerfil.PNGinput, { width: 25, height: 25 }]}
              />
            </TouchableOpacity>
          </View>
          {/* Imagen usuario*/}
          <Image
            source={require("../assets/icons/Perfil-color.png")}
            style={[StylesPerfil.imgUsuario]}
          />
          {/* campo nombre*/}
          <View style={StylesPerfil.containerInput}>
            <Image
              source={require("../assets/icons/Perfil-Nombre-usuario.png")}
              style={[StylesPerfil.PNGinput]}
            />

            <TextInput
              onChangeText={setNombre}
              value={nombrePersona}
              placeholder={"nombre"}
              style={StylesPerfil.input}
              placeholderTextColor="#B3B3B3"
              editable={isEditable}
            />
          </View>
          {/* campo usuario*/}
          <View style={StylesPerfil.containerInput}>
            <Image
              source={require("../assets/icons/Perfil-Nombre-usuario.png")}
              style={[StylesPerfil.PNGinput]}
            />

            <TextInput
              onChangeText={setUsuario}
              value={usuario}
              style={StylesPerfil.input}
              placeholder={"usuario"}
              placeholderTextColor="#B3B3B3"
              editable={isEditable}
            />
          </View>
          {/* campo email*/}
          <View style={StylesPerfil.containerInput}>
            <Image
              source={require("../assets/icons/email.png")}
              style={[StylesPerfil.PNGinput, { height: 22, marginTop: 12 }]}
            />

            <TextInput
              onChangeText={setCorreo}
              value={correo}
              placeholder={infoUsuario.correo ? infoUsuario.correo : "correo"}
              style={StylesPerfil.input}
              placeholderTextColor="#B3B3B3"
              editable={isEditable}
            />
          </View>

          {/*Seccion Dynamic Buttons */}
          <View>
            <TouchableOpacity
              style={isEditable ? StylesPerfil.saveChanges : ""}
              onPress={isEditable ? validarCampos : () => setModalVisible(true)}
            >
              <Text
                style={[
                  isEditable
                    ? StylesPerfil.textSaveChange
                    : StylesPerfil.textChangePassword,
                ]}
              >
                {isEditable ? "Guardar cambios" : "CAMBIAR CONTRASEÑA"}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <PerfilContraseñaModal
                onPress={() => setModalVisible(!modalVisible)}
                altura={"50%"}
                colorBtnOcultar={"#00CE97"}
                textBtn={"Cerrar"}
              />
            </Modal>
          </View>
          {/**Modal de ayuda */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomePerfil;
