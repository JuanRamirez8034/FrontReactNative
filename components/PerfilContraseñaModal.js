/**
 * Componente del Perfil Contrasena Modal (Modal para cambiar contraseña)
 */

import React, { useState } from "react";
import { cambioContrasena } from "../requestBackend/API-Usuarios";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona } from "../fuciones/validador";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { styles, StylesModal, StylesPerfil } from "./styles/Styles";
import { useTogglePasswordVisibility } from "./useToggle";

/**
 * Funcion principal del Perfil Contrasena Modal
 */
const PerfilContrasenaModal = ({
  onPress,
  colorBtnOcultar,
  textBtn,
  colorFondoModal,
  altura,
}) => {
  /**
   * Context que trae la información del Usuario
   */
  const infoUsuario = useContextUsuario();
  /**
   * Declaración de los estados
   */
  const [contrasena, setContrasena] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [correo, setCorreo] = useState("");
  const [activacion, setActivacion] = useState(false);

  /**
   * Función para tachar y mostrar el ojito del campo contraseña
   */
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  /**
   * Función para validar los campos antes de enviar
   */
  const validarCampos = () => {
    let resultado = validarDatosRegistroPersona({
      correo: correo,
      contrasena: confirmacion,
    });
    if (resultado.result != true) {
      Alert.alert("Cambio invalido.", resultado.alerta, [{ text: "Entiendo" }]);
      return;
    }
    cambiarContrasena();
  };

  /**
   * Función para cambiar contraseña
   */
  const cambiarContrasena = async () => {
    const usuario = {
      contrasena: confirmacion,
      correo: correo,
      sesion: true,
      idSession: infoUsuario.idPersona,
    };
    const resultado = await cambioContrasena(usuario);

    // Si la consulta es exitosa
    if (resultado.actualizacion == true) {
      Alert.alert("Cambio de contraseña exitoso", "¡Listo!", [{ text: "Ok" }]);
      restablecerCampos();
    } // Si la consulta falla
    else {
      Alert.alert("Cambio inválido", "Revise sus datos", [
        { text: "Entendido" },
      ]);
    }
  };

  /**
   * Función para restablecer todos los estados al estado inicial
   */
  const restablecerCampos = () => {
    setContrasena("");
    setConfirmacion("");
    setCorreo("");
  };

  /**
   * Return del componente
   */
  return (
    <View
      style={[
        StylesModal.container,
        {
          backgroundColor:
            colorFondoModal === undefined ? "#AAAAAA50" : colorFondoModal,
        },
      ]}
    >
      <View
        style={[
          StylesModal.containerCuerpo,
          {
            height:
              altura === undefined
                ? StylesModal.containerCuerpo.height
                : altura,
          },
        ]}
      >
        {/* Botón ocultar */}
        <TouchableOpacity
          style={[
            StylesModal.botonCerrar,
            {
              backgroundColor:
                colorBtnOcultar === undefined ? "orange" : colorBtnOcultar,
              marginBottom: 10,
            },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.textlogo, { fontWeight: "600" }]}>
            {textBtn === undefined ? "OCULTAR" : textBtn}
          </Text>
        </TouchableOpacity>
        {/* Fin del boton para ocultar */}

        <ScrollView>
          {/* View del form Contrasena */}
          <View
            style={[{ width: "100%", alignItems: "center", marginTop: "18%" }]}
          >
            {/* campo contrasena*/}
            <View style={StylesPerfil.containerInput}>
              <Image
                source={require("../assets/icons/email.png")}
                style={[
                  StylesPerfil.PNGinput,
                  { width: 30, height: 22, marginTop: 12 },
                ]}
              />

              <TextInput
                onChangeText={setCorreo}
                value={correo}
                // onChange={""}
                placeholder={"correo"}
                style={StylesPerfil.input}
                placeholderTextColor="#B3B3B3"
              />
            </View>
            {/* Fin campo contrasena */}
            {/* campo confirmar contrasena*/}
            {/* campo contraseña*/}
            <View style={styles.containerInput}>
              <Image
                source={require("../assets/icons/clave.png")}
                style={[styles.PNGinput, { height: 34, marginTop: 8 }]}
              />

              <TextInput
                onChangeText={setConfirmacion}
                value={confirmacion}
                placeholder="nueva contraseña"
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
            {/* Fin campo confirmar contrasena */}
            {/* Botón guardar cambios */}
            <TouchableOpacity
              style={[
                StylesModal.botonCerrar,
                {
                  backgroundColor: activacion ? "#EDEDEC" : colorBtnOcultar,
                  marginBottom: "20%",
                  alignSelf: "center",
                },
              ]}
              onPress={validarCampos}
              //   disabled={contrasena && confirmacion ? activacion === false : activacion === true}
            >
              <Text style={[styles.textlogo, { fontWeight: "600" }]}>
                Guardar cambios
              </Text>
            </TouchableOpacity>
            {/* Fin boton guardar cambios */}
          </View>
          {/* Fin del form */}
        </ScrollView>
      </View>
    </View>
  );
};
export default PerfilContrasenaModal;
