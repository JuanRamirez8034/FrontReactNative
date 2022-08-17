/**
 * Componente del Modal Info para mostrar y editar información
 */

import React, { useState, useEffect} from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Vibration,
  Alert,
} from "react-native";
import {
  styles,
  StylesModal,
  StylesPerfil,
  StylesCrearRecordatorio,
} from "./styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import SelectDropdown from "react-native-select-dropdown";
import {
  validarDatosRegistroPersona,
  validarRangoFechaInicioFin,
  validarCifrasNumericas,
} from "../fuciones/validador";
import { actualizarProyectos } from "../requestBackend/API-Proyectos";
import { actualizarRecordatorios } from "../requestBackend/API-Recordatorios";
import { actualizarActividad } from "../requestBackend/API-Actividad";

/**
 * Funcion principal del Modal Info
 */
const ModalInfo = ({
  onPress,
  informacion,
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
  //Estado para habilitar o desabilitar TextInput
  const [isEditable, setIsEditable] = useState(false);
  // Datos
  const [descripcion, setDescripcion] = useState(informacion.descripcion);
  const [estado, setEstado] = useState(informacion.estado);
  const [monto, setMonto] = useState(informacion.monto);
  const [fechaInicio, setFechaInicio] = useState(
    informacion.fechaInicio.slice(0, 10)
  );
  const [fechaFin, setFechaFin] = useState(informacion.fechaFin.slice(0, 10));
  const [horaInicio, setHoraInicio] = useState(
    informacion.fechaInicio.slice(11, 16)
  );
  const [horaFin, setHoraFin] = useState(informacion.fechaFin.slice(11, 16));
  // Array para guardar los nuevos datos
  const [datos, setDatos] = useState({
    sesion: true,
    idSesion: infoUsuario.idPersona,
    proyecto_idProyecto: informacion.proyecto_idProyecto,
    idProyecto: informacion.idProyecto,
    idRecordatorio: informacion.idRecordatorio,
    idActividad: informacion.idActividad,
    descripcion: "",
    estado: "",
    monto: "",
    fechaFin: "",
    fechaInicio: "",
  });

  /**
   * Si el id informacion.idproyecto está, no colocar ciertos inputs
   */
  const proyect = informacion.idProyecto !== undefined ? true : false;
  /**
   * Tipos de estados dentro del SelectDropdown
   */
  const estados = ["Activo", "Terminado", "Abandonado"];
  /**
   * UseEffect para llamar la función de actualizar cada vez que haya un cambio en el estado "Datos"
   */
  useEffect(() => {
    console.log(datos);
    if (datos.estado === "" || datos.fechaFin === "" || datos.monto === "")
      return;
    handleUpdate();
  }, [datos]);

  /**
   * Función para habilitar/desabilitar la edicion
   */
  const enableInputs = () => {
    setIsEditable(!isEditable);
  };

  /**
   * funcion para validar los campos antes de enviar
   */
  const validarCampos = () => {
    console.log("Validar campos Modal Info");

    // Validar descripción
    if (descripcion == "" || descripcion === null) {
      Alert.alert(
        "Descripcion invalida",
        "El campo 'descripción' no puede estar vacio",
        [{ text: "Entiendo" }]
      );
      return;
    }
    // Validar monto
    if (proyect === true) {
      // Si monto está vacio
      if (monto == "" || monto === null) {
        Alert.alert("Monto invalido", "El campo 'monto' no puede estar vacio", [
          { text: "Entiendo" },
        ]);
        return;
      } //De lo contrario validar cifras numericas
      else if (validarCifrasNumericas(monto)) {
        Alert.alert(
          "Monto inválido",
          "El campo 'monto' solo permite numeros y puntos, ejemplo: \"10.32\"",
          [{ text: "Entiendo" }]
        );
        return;
      }
    }
    // Validar fechas
    let resultado = validarDatosRegistroPersona({
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      horaInicio: horaInicio,
      horaFin: horaFin,
    });
    // Validar Rango de fechas
    if (fechaInicio !== "" && fechaFin !== "") {
      if (
        !validarRangoFechaInicioFin({
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
        })
      ) {
        Alert.alert(
          "Rango de fechas inválido",
          `La fecha incial "${fechaInicio}" no puede ser mayor a la fecha final "${fechaFin}"`,
          [{ text: "Entiendo" }]
        );
        return;
      }
    }
    // Si hay un error en la información
    if (resultado.result !== true) {
      console.log("Error");
      Alert.alert("Actualización inválida", resultado.alerta, [
        { text: "Entiendo" },
      ]);
      return;
    } //Si no, guardar la información
    else {
      setDatos({
        ...datos,
        descripcion: descripcion,
        estado: estado,
        monto: monto,
        fechaInicio: `${fechaInicio}T${horaInicio}:00`,
        fechaFin: `${fechaFin}T${horaFin}:00`,
      });
    }
  };

  /**
   * funcion para actualizar el registro
   */
  const handleUpdate = async () => {
    let tipo;
    let respuesta;
    if (
      informacion.idProyecto &&
      informacion.idRecordatorio == undefined &&
      informacion.idActividad == undefined
    ) {
      tipo = "Proyecto";
      respuesta = await actualizarProyectos(datos);
    } else if (
      informacion.idProyecto == undefined &&
      informacion.idRecordatorio &&
      informacion.idActividad == undefined
    ) {
      tipo = "Recordatorio";
      respuesta = await actualizarRecordatorios(datos);
    } else {
      tipo = "Actividad";
      respuesta = await actualizarActividad(datos);
    }

    if (!respuesta.resultado === true) {
      Vibration.vibrate(1500);
      Alert.alert(
        `El ${tipo} no se pudo actualizar`,
        `Situacion:\n ${
          respuesta.resultado === undefined
            ? JSON.stringify(respuesta)
            : JSON.stringify(respuesta.resultado)
        }`,
        [{ text: "Entiendo" }]
      );
    } else {
      Vibration.vibrate(200);
      Alert.alert("¡Aviso!", `${tipo} actualizado con exito`, [
        { text: "Entiendo" },
      ]);
      setIsEditable(false);
    }
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
      {/* View que contiene el botón y el form */}
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
        {/* Boton OK en parte superior */}
        <TouchableOpacity
          style={[
            StylesModal.botonCerrar,
            {
              backgroundColor:
                colorBtnOcultar === undefined ? "orange" : colorBtnOcultar,
              margin: 0,
            },
          ]}
          onPress={onPress}
        >
          {/* Texto del botón */}
          <Text style={[styles.textlogo, { fontWeight: "600" }]}>
            {textBtn === undefined ? "OCULTAR" : textBtn}
          </Text>
        </TouchableOpacity>

        {/* Img Editar */}
        <View style={[StylesPerfil.vieweditar, { margin: 0 }]}>
          <TouchableOpacity onPress={() => enableInputs()}>
            <Image
              source={require("../assets/icons/Peril-Editar.png")}
              style={[
                StylesPerfil.PNGinput,
                { width: 25, height: 25, margin: 5 },
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* View de la información */}
        <View style={[StylesModal.cuerpoInformacion, { height: "80%" }]}>
          <ScrollView>
            {/* Descripción */}
            <Text style={[StylesModal.subtitulo]}>Descripción:</Text>
            <View
              style={[
                {
                  width: Dimensions.get("window").width - 120,
                  borderBottomWidth: 1,
                  borderColor: "#B3B3B3",
                },
              ]}
            >
              <TextInput
                onChangeText={setDescripcion}
                value={descripcion}
                placeholder={"descripcion"}
                style={[
                  {
                    marginLeft: 5,
                    fontSize: 16,
                    color: "#808080",
                  },
                ]}
                placeholderTextColor="#B3B3B3"
                editable={isEditable}
              />
            </View>

            {/* Estado */}
            {proyect ? (
              <View></View>
            ) : (
              <Text style={[StylesModal.subtitulo, { marginBottom: 0 }]}>
                Estado:
              </Text>
            )}
            {/*lista select */}
            {proyect ? (
              <View></View>
            ) : (
              <View
                style={[
                  StylesCrearRecordatorio.containerInputDoble,
                  {
                    width: Dimensions.get("window").width - 120,
                    marginBottom: 0,
                  },
                ]}
              >
                <SelectDropdown
                  data={estados}
                  onSelect={(selectedItem, index) => {
                    setEstado(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    width: "100%",
                    borderBottomWidth: 1,
                    borderBottomColor: "#B3B3B3",
                  }}
                  buttonTextStyle={{
                    color: "#808080",
                    fontWeight: "400",
                    fontSize: 16,
                  }}
                  dropdownStyle={{
                    borderRadius: 10,
                    backgroundColor: "white",
                    height: "20%",
                  }}
                  dropdownOverlayColor="#B3B3B315"
                  rowStyle={{
                    backgroundColor: "#B3B3B310",
                  }}
                  rowTextStyle={{ color: "#B3B3B3", fontWeight: "400" }}
                  selectedRowStyle={{ backgroundColor: "#ffdb6f" }}
                  selectedRowTextStyle={{ color: "white" }}
                  search={true}
                  searchPlaceHolder={"Buscar:"}
                  searchInputStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#B3B3B3",
                  }}
                  searchInputTxtColor={"#B3B3B3"}
                  defaultValue={informacion.estado}
                  disabled={!isEditable}
                />
              </View>
            )}

            {/* <View
                style={[
                  // StylesPerfil.containerInput,
                  {
                    width: Dimensions.get("window").width - 120,
                    borderBottomWidth: 1,
                    borderColor: "#B3B3B3",
                  },
                ]}
              >
                <TextInput
                  onChangeText={setEstado}
                  value={estado}
                  placeholder={"estado"}
                  style={[
                    {
                      marginLeft: 5,
                      fontSize: 16,
                      color: "#808080",
                    },
                  ]}
                  placeholderTextColor="#B3B3B3"
                  editable={isEditable}
                />
              </View> */}

            {/* Fecha Inicio */}
            <Text style={[StylesModal.subtitulo]}>Fecha inicio:</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: Dimensions.get("window").width - 120,
              }}
            >
              {/* Fecha */}
              <View
                style={[
                  {
                    width: proyect
                      ? Dimensions.get("window").width - 120
                      : "45%",
                    borderBottomWidth: 1,
                    borderColor: "#B3B3B3",
                  },
                ]}
              >
                <TextInput
                  onChangeText={setFechaInicio}
                  value={fechaInicio}
                  placeholder={"fecha de inicio"}
                  style={[
                    {
                      marginLeft: 5,
                      fontSize: 16,
                      color: "#808080",
                    },
                  ]}
                  placeholderTextColor="#B3B3B3"
                  editable={isEditable}
                />
              </View>
              {/* Hora */}
              <View
                style={[
                  proyect
                    ? ""
                    : {
                        width: "45%",
                        borderBottomWidth: 1,
                        borderColor: "#B3B3B3",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      },
                ]}
              >
                <TextInput
                  onChangeText={setHoraInicio}
                  value={proyect ? "" : horaInicio}
                  placeholder={proyect ? "" : "hora de inicio"}
                  style={[
                    {
                      marginLeft: 5,
                      fontSize: 16,
                      color: "#808080",
                    },
                  ]}
                  placeholderTextColor="#B3B3B3"
                  editable={isEditable}
                />
              </View>
            </View>

            {/* Fecha Fin */}
            <Text style={[StylesModal.subtitulo]}>Fecha fin:</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: Dimensions.get("window").width - 120,
              }}
            >
              {/* Fecha */}
              <View
                style={[
                  {
                    width: proyect
                      ? Dimensions.get("window").width - 120
                      : "45%",
                    borderBottomWidth: 1,
                    borderColor: "#B3B3B3",
                  },
                ]}
              >
                <TextInput
                  onChangeText={setFechaFin}
                  value={fechaFin}
                  placeholder={"fecha de fin"}
                  style={[
                    {
                      marginLeft: 5,
                      fontSize: 16,
                      color: "#808080",
                    },
                  ]}
                  placeholderTextColor="#B3B3B3"
                  editable={isEditable}
                />
              </View>
              {/* Hora */}
              <View
                style={[
                  proyect
                    ? ""
                    : {
                        width: "45%",
                        borderBottomWidth: 1,
                        borderColor: "#B3B3B3",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      },
                ]}
              >
                <TextInput
                  onChangeText={setHoraFin}
                  value={proyect ? "" : horaFin}
                  placeholder={proyect ? "" : "hora de fin"}
                  style={[
                    {
                      marginLeft: 5,
                      fontSize: 16,
                      color: "#808080",
                    },
                  ]}
                  placeholderTextColor="#B3B3B3"
                  editable={isEditable}
                />
              </View>
            </View>

            {/* Monto */}
            <Text style={[StylesModal.subtitulo]}>
              {proyect ? "Monto:" : ""}
            </Text>
            <View
              style={[
                proyect
                  ? {
                      width: Dimensions.get("window").width - 120,
                      borderBottomWidth: 1,
                      borderColor: "#B3B3B3",
                      marginBottom: 25,
                    }
                  : "",
              ]}
            >
              <TextInput
                onChangeText={setMonto}
                value={
                  proyect ? (monto === undefined ? "" : monto.toString()) : ""
                }
                placeholder={proyect ? "monto" : ""}
                style={[
                  {
                    marginLeft: 5,
                    fontSize: 16,
                    color: "#808080",
                  },
                ]}
                placeholderTextColor="#B3B3B3"
                keyboardType="numeric"
                editable={isEditable}
              />
            </View>

            {/* Botón guardar cambios */}
            <TouchableOpacity
              style={
                isEditable
                  ? [
                      StylesPerfil.saveChanges,
                      {
                        marginVertical: 10,
                        width: Dimensions.get("window").width - 120,
                        alignSelf: "center",
                      },
                    ]
                  : [
                      StylesPerfil.saveChanges,
                      {
                        backgroundColor: "#B3B3B3",
                        marginVertical: 10,
                        width: Dimensions.get("window").width - 120,
                        alignSelf: "center",
                      },
                    ]
              }
              onPress={isEditable ? validarCampos : () => {}}
            >
              <Text style={[StylesPerfil.textSaveChange]}>Guardar cambios</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ModalInfo;
