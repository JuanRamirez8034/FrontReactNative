/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de  crear y editar egresos
 */
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Vibration } from "react-native";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarCifrasNumericas } from "../fuciones/validador";
import { registrarEgreso, actualizarEgresos, eliminarEgresos } from "../requestBackend/API-Egresos";
import { styles, StylesCrearRecordatorio, StylesHome, StylesConsultaMovimientos, StylesHomeFinanzas } from '../components/styles/Styles'
import { SafeAreaView } from "react-native-safe-area-context";
import ModalAlert from "../components/ModalAlert";
import BotonEliminar from "../components/BotonEliminar";


const CrearEgreso = (props) => {
    //props.route.params !== undefined ? console.log(JSON.stringify(props.route.params)):{}
    /**
     * Constante que contiene la información del usuario
     * almacenada en el contexto
     */
    const infousuario = useContextUsuario();

    /**
     * Constante con la fecha actual del dispositivo
     */
    const fechaActual = new Date().toISOString().slice(0, 16);

    /**
     * Declaración de estados
     */
    // Estado que contiene la fecha sin hora
    const [fecha, cargarFecha] = useState({ "fecha": (props.route.params !== undefined ? (props.route.params.fecha).slice(0, 10) : fechaActual.slice(0, 10)) });
    // Estado que contiene la hora sin fecha
    const [hora, cargarHora] = useState({ "hora": (props.route.params !== undefined ? (props.route.params.fecha).slice(11, 16) : fechaActual.slice(11, 16)) });
    // Estado para almacenar la informacion del egreso a crear
    const [infoEgreso, cargarInfoEgreso] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "motivo": (props.route.params !== undefined ? props.route.params.motivo : ""),
        "monto": (props.route.params !== undefined ? props.route.params.monto.toString() : ""),
        "fecha": "",
        "persona_idPersona": infousuario.idPersona
    });
    // Estado para utilizar la modal "ModalAlert" (hacer visible)
    const [visual, setVisual] = useState(false);
    // Estado para utilizar la modal "ModalAlert" (Informacion del modal)
    const [info, setInfo] = useState({ "titulo": "", "subTitulo": "", "parrafo": "" });

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
        cargarInfoEgreso({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "motivo": "",
            "monto": "",
            "fecha": fechaActual,
            "persona_idPersona": infousuario.idPersona
        });
        cargarFecha({ "fecha": fechaActual.slice(0, 10) });
        cargarHora({ "hora": fechaActual.slice(11, 16) });
    }

    /**
     * Función para modificar los valores de los estados
     */
    const handleCargarEstado = (index, valor, tipoState) => {
        if (tipoState === "infoEgreso") {
            cargarInfoEgreso({ ...infoEgreso, [index]: valor });
        }
        if (tipoState === "fecha") {
            cargarFecha({ ...fecha, [index]: valor });
        }
        if (tipoState === "hora") {
            cargarHora({ ...hora, [index]: valor });
        }
        //console.log(JSON.stringify(infoEgreso));
    }

    /**
     * funcion para verificar datos antes del proceso de registro de recordatorio nuevo
     */
    const validarCampos = () => {
        if (infoEgreso.motivo === '' || infoEgreso.motivo === null) {
            setInfo({ "titulo": "Alerta", "subTitulo": "Motivo invalido", "parrafo": "El campo \'Motivo\' no puede estar vacio" });
            return;
        }
        if (infoEgreso.monto == '' || infoEgreso.monto === null) {
            setInfo({ "titulo": "Alerta", "subTitulo": "Monto invalido", "parrafo": "El campo \'monto\' no puede estar vacio" });
            return;
        }
        if (validarCifrasNumericas(infoEgreso.monto)) {
            setInfo({ "titulo": "Alerta", "subTitulo": "Monto invalido", "parrafo": "El campo \'monto\' solo permite numeros, comas y puntos (0-9 \",\" \".\") y un maximo de 2 decimales, ejemplo: \"10.32\"" });
            return;
        }
        let resultado = validarDatosRegistroPersona(fecha);
        if (resultado.result != true) {
            setInfo({ "titulo": "Alerta", "subTitulo": "Fecha invalida", "parrafo": resultado.alerta });
            return;
        }
        resultado = validarDatosRegistroPersona(hora);
        if (resultado.result != true) {
            setInfo({ "titulo": "Alerta", "subTitulo": "Hora invalida", "parrafo": resultado.alerta });
            return;
        }
        ////////////////////////////////////
        cargarInfoEgreso({ ...infoEgreso, "fecha": `${fecha.fecha}T${hora.hora}:00` });

    }

    /**
     * Funcion para cargar en el estado que contiene la informacion,
     * la fecha con su hora correspondiente, solo se ejecuta al cambiar
     * "infoegreso"
     */
    useEffect(() => {
        if (infoEgreso.fecha !== "" && infoEgreso.monto !== "" && infoEgreso.motivo !== "") {
            console.log(JSON.stringify(infoEgreso));
            handleProcesarEgreso();
            cargarInfoEgreso({ ...infoEgreso, "fecha": "" });
            return;
        }
    }, [infoEgreso.fecha]);

    /**
     * Funcion para accionar el proceso de resgitro/actualizacion del egreso
     */
    const handleProcesarEgreso = async () => {
        // si estan definidos parametros se actualiza, sino se registra
        if (props.route.params === undefined) {
            const respuesta = await registrarEgreso(infoEgreso);
            if (!respuesta.registro === true) {
                //Vibration.vibrate(1500);
                setInfo({ "titulo": "Error", "subTitulo": "El egreso no se pudo crear", "parrafo": `Situacion:\n ${respuesta.resultado === undefined ? JSON.stringify(respuesta) : JSON.stringify(respuesta.resultado)}` });
            } else {
                //Vibration.vibrate(200);
                restablecerCampos();
                setInfo({ "titulo": "Crear egreso", "subTitulo": "¡Aviso!", "parrafo": "Egreso creado con exito" });
            }
        } else {
            const respuesta = await actualizarEgresos({
                "sesion": true,
                "idSesion": infousuario.idPersona,
                "motivo": infoEgreso.motivo,
                "monto": infoEgreso.monto,
                "fecha": infoEgreso.fecha,
                "idEgreso": props.route.params.id
            });
            if (respuesta.affectedRows !== 1) {
                setInfo({ "titulo": "Error", "subTitulo": "El egreso no se pudo crear", "parrafo": `Situacion:\n ${JSON.stringify(respuesta)}` });
            } else {
                props.navigation.navigate("ConsultaEgresos");
            }
        }
    }

    /**
     * Funcion para accionar el proceso de eliminacion del egreso
     */
    const handleEliminarEgreso = async () => {
        const data = await eliminarEgresos({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "idEgreso": props.route.params.id
        });
        if (data.affectedRows === 0) {
            setInfo({
                titulo: "Aviso",
                subTitulo: "Operación no completada",
                parrafo: `El egreso no se pudo eliminar.\nMotivo:\n${JSON.stringify(data)}`
            });
        } else {
            props.navigation.navigate("ConsultaEgresos");
        }
    }
    return (
        <ScrollView style={[StylesHome.container, StylesHomeFinanzas.colorFondo]}>
            <SafeAreaView style={[StylesConsultaMovimientos.todoAlto]}>
                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo]} source={require('../assets/icons/Logo-sup.png')} />

                {/**formulario contenedor */}
                <View style={[StylesCrearRecordatorio.containerFormulario, { alignItems: 'center', height: '80%' }]}>
                    <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 37, width: 37 }]} source={require('../assets/icons/Egresos.png')} />
                        <Text style={StylesCrearRecordatorio.saludo}>{(props.route.params !== undefined ? "Editar Egreso" : "Nuevo Egreso")}</Text>
                    </View>

                    {/*Entrada motivo*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_Título_del_Tag.png')}
                            style={[StylesCrearRecordatorio.inputPNG]}
                        />
                        <TextInput
                            onChangeText={(textoEntrando) => handleCargarEstado("motivo", textoEntrando, "infoEgreso")}
                            value={infoEgreso.motivo}
                            placeholder="Motivo"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*entrada monto*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_dinero.png')}
                            style={[StylesCrearRecordatorio.dualInputPNG, { marginTop: 12 }]}
                        />

                        <TextInput
                            onChangeText={(textoEntrando) => handleCargarEstado('monto', textoEntrando, "infoEgreso")}
                            value={infoEgreso.monto}
                            placeholder="Monto"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>


                    {/**campo fecha con hora */}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Incio</Text>

                        <View style={[{ flexDirection: 'row' }]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '55%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("fecha", textoEntrando, "fecha")}
                                    value={fecha.fecha}
                                    placeholder="año/mes/dia"
                                    style={[StylesCrearRecordatorio.input]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '40%', marginLeft: '5%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Tiempo.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("hora", textoEntrando, "hora")}
                                    value={hora.hora}
                                    placeholder="00:00"
                                    style={[StylesCrearRecordatorio.input, { width: '68%' }]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                        </View>
                    </View>

                    {/*Button */}
                    <TouchableOpacity
                        style={[styles.boton, { backgroundColor: '#00CE97' }]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, { color: 'white' }]}>{props.route.params !== undefined ? "Acualizar" : "Crear"}</Text>
                    </TouchableOpacity>
                    {/**Boton eliminar */}
                    {
                        props.route.params !== undefined ?
                            <BotonEliminar
                                colorBoton="red"
                                textBoton="Eliminar Egreso"
                                accionEliminar={handleEliminarEgreso}
                            />
                            :
                            <View></View>
                    }
                </View>
            </SafeAreaView>
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
        </ScrollView>
    );
}

export default CrearEgreso;