/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de  consulta egresos
 */
import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, TextInput } from "react-native";
import {
    StylesConsultasOrganizador,
    styles,
    StylesHome,
    StylesHomeFinanzas,
    StylesConsultaMovimientos,
    StylesListaMovimientos
} from "../components/styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ListaEgresosItems from "../components/ListaEgresosItems";
import ModalAlert from "../components/ModalAlert";
import { useIsFocused } from '@react-navigation/native';
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona } from "../fuciones/validador";
import { consultaEgresos } from "../requestBackend/API-Egresos";
import { validarRangoFechaInicioFin } from "../fuciones/validador";

const ConsultaEgresos = (props) => {
    /**
     * Constante que contiene la información del usuario
     * almacenada en el contexto
     */
    const infoUsuario = useContextUsuario();

    /**
     * Constante con la fecha actual del dispositivo
     */
    const fechaActual = new Date().toISOString().slice(0, 10);

    /**
     * Constante que identifica la posición del usuario entre pantalla
     */
    const isFocus = useIsFocused();

    /**
     * Declaración de estados
     */
    // Estado que contiene la fecha inicio y fial para la onsulta por rango
    const [fechasEgresos, cargarFechasEgresos] = useState({
        "fechaInicio": "",
        "fechaFin": ""
    });
    // estado contenedor del resultado de la busqueda de movimientos
    const [dataEgresos, setDataEgresos] = useState([
        {
            "motivo": "No posee Egresos",
            "monto": "0,00",
            "fecha": "0000/00/00 00:00",
            "proyecto_idProyecto": null,
            "persona_idPersona": null,
            "idEgreso": null
        }
    ]);
    // Estado para utilizar la modal "ModalAlert" (hacer visible)
    const [visual, setVisual] = useState(false);
    // Estado para utilizar la modal "ModalAlert" (Informacion del modal)
    const [info, setInfo] = useState({ "titulo": "", "subTitulo": "", "parrafo": "" });

    /**
     * Funcion para realizar consulta de movimientos por mes cada vez que el usuario 
     * acceda a la pantalla
     */
    useEffect(() => {
        obtenerEgresos("Mensual");
        restablecerCampos();
    }, [isFocus]);

    /**
     * Efecto para llamar a la modal cada vez que hayan cambios en el contenido
     * del estado info
     */
    useEffect(() => {
        if (info.subTitulo === "" || info.parrafo === "" || info.titulo === "") { return }
        setVisual(true);
    }, [info]);

    /**
     * Funcion para restablecer la informacion del modal ("ModalAlert")
     */
    useEffect(() => {
        if (visual === false) {
            setInfo({ "titulo": "", "subTitulo": "", "parrafo": "" });
        }
    }, [visual]);

    /**
     * Funcion para restablecer todos los estados al estado inicial
     */
    const restablecerCampos = () => {
        cargarFechasEgresos({
            "fechaInicio": `${fechaActual.slice(0, 8)}01`,
            "fechaFin": fechaActual
        });
    }

    /**
     * Función para modificar los valores de los estados
     */
    const handleCargarEstado = (index, valor) => {
        cargarFechasEgresos({ ...fechasEgresos, [index]: valor });
        //console.log(JSON.stringify(fechasEgresos));
    }

    /**
     * funcion para verificar datos antes del proceso de consulta de egresos por rango
     */
    const validarCampos = () => {

        let resultado = validarDatosRegistroPersona(fechasEgresos)
        if (resultado.result !== true) {
            setInfo({ "titulo": "Consulta egresos", "subTitulo": "Fecha invalida", "parrafo": resultado.alerta });
            return;
        }

        if (!validarRangoFechaInicioFin(fechasEgresos)) {
            setInfo({ "titulo": "Consulta eregsos", "subTitulo": "Rango de tiempo invalido", "parrafo": `La fecha incial "${fechasEgresos.fechaInicio}" no puede ser mayor a la fecha final "${fechasEgresos.fechaFin}"` });
            return;
        }
        obtenerEgresos("Rango");
    }

    /**
     * Funcion para cargar el estado con la informacion de los egresos
     * a un estado por defecto
     */
    const cargarMovimientoDefault = () => {
        setDataEgresos([
            {
                "motivo": "No posee egresos",
                "monto": "0,00",
                "fecha": "0000/00/00 00:00",
                "proyecto_idProyecto": null,
                "persona_idPersona": null,
                "idEgreso": null
            }
        ]);
    }

    /**
     * Funcion para accionar el proceso de consulta de egresos 
     */
    const obtenerEgresos = async (periodo) => {
        if (periodo === "Mensual") {
            const data = await consultaEgresos({
                "sesion": true,
                "idSesion": infoUsuario.idPersona,
                "rangoInicio": `${fechaActual.slice(0, 8)}01`,
                "rangoFin": fechaActual
            });
            //console.log(JSON.stringify(data));
            if (data.length !== 0) {
                setDataEgresos(data);
            } else {
                cargarMovimientoDefault();
            }
        }
        if (periodo === "Rango") {
            const data = await consultaEgresos({
                "sesion": true,
                "idSesion": infoUsuario.idPersona,
                "rangoInicio": fechasEgresos.fechaInicio,
                "rangoFin": fechasEgresos.fechaFin
            });
            //console.log(JSON.stringify(data));
            if (data.length !== 0) {
                setDataEgresos(data);
            } else {
                cargarMovimientoDefault();
            }
        }

    }
    return (
        <SafeAreaView style={[StylesHomeFinanzas.colorFondo, styles.container]}>
            {/* <StatusBar translucent={true} backgroundColor="#FFDD9B" /> */}
            {/* Logo */}
            <Image
                style={StylesConsultasOrganizador.logo}
                source={require("../assets/icons/Logo-sup.png")}
            />

            {/* Contenedor del form */}
            <View style={[StylesConsultasOrganizador.container]}>
                <Image
                    style={[styles.lineasup, { marginBottom: 0, alignSelf: "center" }]}
                    source={require("../assets/icons/Linea-sup.png")}
                />
                {/* Titulo + boton */}
                <View
                    style={[
                        {
                            flexDirection: "row",
                            width: "80%",
                            justifyContent: "space-between",
                            marginTop: 20,
                        },
                    ]}
                >
                    {/* Titulo */}
                    <View style={[{ flexDirection: "row", alignSelf: "center" }]}>
                        <Image
                            style={[
                                { alignSelf: "center", height: 35, width: 35, marginRight: 8, resizeMode: 'contain' },
                            ]}
                            source={require("../assets/icons/Egresos.png")}
                        />
                        <Text style={{ fontSize: 23, fontWeight: "500", color: "#666666", marginTop: 3 }}>
                            Egresos
                        </Text>
                    </View>
                    {/* Boton azul */}
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("CrearEgreso")}
                    >
                        <Image
                            style={[
                                StylesHome.botonNueva,
                                { height: 32, width: 32, alignSelf: "center", margin: 0 },
                            ]}
                            source={require("../assets/icons/plus.png")}
                        ></Image>
                    </TouchableOpacity>
                </View>

                {/**campo rango de fecha*/}
                <View style={[StylesConsultaMovimientos.containerInputDoble, { marginTop: 10 }]}>
                    <Text style={[StylesConsultaMovimientos.textInputDoble]}>entre</Text>
                    <TextInput
                        onChangeText={(textoEntrando) => handleCargarEstado("fechaInicio", textoEntrando)}
                        value={fechasEgresos.fechaInicio}
                        placeholder={fechaActual}
                        style={[StylesConsultaMovimientos.input]}
                        placeholderTextColor="#B3B3B3"
                    />
                    <Text style={[StylesConsultaMovimientos.textInputDoble]}>a</Text>
                    <TextInput
                        onChangeText={(textoEntrando) => handleCargarEstado("fechaFin", textoEntrando)}
                        value={fechasEgresos.fechaFin}
                        placeholder={fechaActual}
                        style={[StylesConsultaMovimientos.input]}
                        placeholderTextColor="#B3B3B3"
                    />
                </View>
                {/*Button */}
                <View style={[{ flexDirection: 'row', alignItems: 'flex-start', width: '80%' }]}>
                    <TouchableOpacity
                        style={[StylesListaMovimientos.botonPequeno, { backgroundColor: '#00ce97', marginBottom: 5 }]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, { color: 'white' }]}>CONSULTAR</Text>
                    </TouchableOpacity>
                </View>

                {/**Lista de egresos*/}
                <ListaEgresosItems
                    datas={dataEgresos}
                    navegar={props.navigation}
                />
            </View>
            {/**Modal alert */}
            <ModalAlert
                VisibleModal={visual}
                setVisibleModal={() => setVisual(!visual)}
                textTitleModal={info.titulo}
                textSubtilulo={info.subTitulo}
                textParrafo={info.parrafo}
                backgroundColor="#A3A3A380"
                backgroundColorButton="#97e5d0"
            />
        </SafeAreaView>
    );
};

export default ConsultaEgresos;
