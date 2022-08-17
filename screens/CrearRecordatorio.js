/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de crear recordatorios
 */
import React,{useState, useEffect} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Vibration} from "react-native";
import { styles, StylesHome, StylesCrearRecordatorio,StylesConsultaMovimientos } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin } from "../fuciones/validador";
import { registrarRecordatorio } from "../requestBackend/API-Recordatorios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ModalAlert from "../components/ModalAlert";

const CrearRecordatorio = (props) =>{
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
    // Estado para almacenar fecha incial y fecha final sin hora
    const [fecha, cargarFecha] = useState({"fechaInicio":fechaActual.slice(0, 10), "fechaFin":""});
    // Estado para almacenar hora incial y fecha final sin fecha
    const [hora, cargarHora] = useState({"horaInicio":fechaActual.slice(11, 16), "horaFin":""});
    // Estado para utilizar la modal "ModalAlert" (hacer visible)
    const [visual, setVisual] = useState(false);
    // Estado para utilizar la modal "ModalAlert" (Informacion del modal)
    const [info, setInfo] = useState({"titulo":"","subTitulo":"", "parrafo":""});
    // Estado para almacenar la informacion del recordatorio a crear
    const [infoRecordatorio, cargarinfoRecordatorio] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "descripcion": "",
        "fechaInicio": "",
        "fechaFin": "",
        "estado": "Activo"
    });

    
    /**
     * Efecto para llamar a la modal cada vez que hayan cambios en el contenido
     * del estado info
     */
    useEffect(()=>{
        if(info.subTitulo==="" || info.parrafo ==="" || info.titulo===""){return}
        setVisual(true);
    },[info]);

    /**
     * Funcion para restablecer todos los estados al estado inicial
     */
    const restablecerCampos = ()=>{
        cargarinfoRecordatorio({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "fechaInicio": "",
            "fechaFin": "",
            "estado": "Activo"
        });
        cargarFecha({"fechaInicio":fechaActual.slice(0, 10), "fechaFin":""});
        cargarHora({"horaInicio":fechaActual.slice(11, 16), "horaFin":""});
    }

    /**
     * Funcion para restablecer la informacion del modal ("ModalAlert")
     */
    useEffect(()=>{
        if(visual === false){
            setInfo({"titulo":"","subTitulo":"","parrafo":""});
        }
    },[visual]);

    /**
     * Función para modificar los valores de los estados
     */
    const handleCargarEstado = (index,valor, tipoState) =>{
        if(tipoState === "infoRecordatorio"){
           cargarinfoRecordatorio({...infoRecordatorio, [index]:valor}); 
        }
        if(tipoState === "fecha"){
            cargarFecha({...fecha, [index]:valor}); 
        }
        if(tipoState === "hora"){
            cargarHora({...hora, [index]:valor}); 
        }
        //console.log(JSON.stringify(infoRecordatorio));
    }

    /**
     * funcion para verificar datos antes del proceso de registro de recordatorio nuevo
     */
    const validarCampos = () =>{
        if(infoRecordatorio.descripcion===''|| infoRecordatorio.descripcion ===null){
            setInfo({"titulo":"Alerta","subTitulo":"Descripcion invalida", "parrafo":"El campo \'descripción\' no puede estar vacio"});
            return;
        }
        let resultado = validarDatosRegistroPersona(fecha);
        if(resultado.result != true){
            setInfo({"titulo":"Alerta","subTitulo":"Fecha invalida", "parrafo":resultado.alerta});
            return;
        }
        resultado = validarDatosRegistroPersona(hora);
        if(resultado.result != true){
            setInfo({"titulo":"Alerta","subTitulo":"Hora invalida", "parrafo":resultado.alerta});
            
            return;
        }
        ////////////////////////////////////
        cargarinfoRecordatorio({...infoRecordatorio, "fechaInicio":`${fecha.fechaInicio}T${hora.horaInicio}:00`, "fechaFin":`${fecha.fechaFin}T${hora.horaFin}:00`});
        /////////////////////////////////
    }

    /**
     * Funcion para verificar el rango de las fechas correcto
     * solo se ejecuta una vez modificado la fecha en el el 
     * "infoRecordatorio"
     */
    useEffect(()=>{
        if(infoRecordatorio.fechaFin !=="" && infoRecordatorio.fechaInicio!==""){
            if(!validarRangoFechaInicioFin(infoRecordatorio)){
                setInfo({"titulo":"Alerta","subTitulo":"Rango de tiempo invalido", "parrafo":`La fecha incial "${infoRecordatorio.fechaInicio}" no puede ser mayor a la fecha final "${infoRecordatorio.fechaFin}"`});
                cargarinfoRecordatorio({...infoRecordatorio, "fechaInicio":"", "fechaFin":""});
                return;
            }
            //console.log(JSON.stringify(infoRecordatorio));
            handleCrearRecordatorio();
        }
        
    },[infoRecordatorio.fechaFin])

    /**
     * Funcion para accionar el proceso de resgitro del recordatorio nuevo
     */
    const handleCrearRecordatorio = async () =>{
        const respuesta = await registrarRecordatorio(infoRecordatorio);
        if(!respuesta.registro === true){
            Vibration.vibrate(1500);
            setInfo({"titulo":"Error registro","subTitulo":"El recordatorio no se pudo crear", "parrafo":`Situacion:\n ${respuesta.resultado === undefined? JSON.stringify(respuesta): JSON.stringify(respuesta.resultado)}`});
            
        }else{
            Vibration.vibrate(200);
            setInfo({"titulo":"Crear recordatorio","subTitulo":"Registro exitoso", "parrafo":`El recordatorio: "${infoRecordatorio.descripcion}" fue creado exitosamente`});
            restablecerCampos();
        }
    }

    return (
        <ScrollView style={[StylesHome.container]}>
            {/* <StatusBar backgroundColor="white" translucent={true}/> */}
            <SafeAreaView style={[StylesConsultaMovimientos.todoAlto]}>

                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo]} source={require('../assets/icons/Logo-sup.png')} />

                {/**formulario contenedor */}
                <View style={[StylesCrearRecordatorio.containerFormulario,{ alignItems: 'center' , height:'80%'}]}>

                    <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 30, width: 30 }]} source={require('../assets/icons/Icon-recordatorio-color.png')} />
                        <Text style={StylesCrearRecordatorio.saludo}>Recordatorio</Text>
                    </View>

                    {/*Entrada descripcion*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_Título_del_Tag.png')}
                            style={[StylesCrearRecordatorio.inputPNG]}
                        />
                        <TextInput
                            onChangeText={(textoEntrando) => handleCargarEstado("descripcion", textoEntrando, "infoRecordatorio")}
                            value={infoRecordatorio.descripcion}
                            placeholder="Descripción"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/**campo fecha con hora INCIO */}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Incio</Text>

                        <View style={[{ flexDirection: 'row' }]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '55%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("fechaInicio", textoEntrando, "fecha")}
                                    value={fecha.fechaInicio}
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
                                    onChangeText={(textoEntrando) => handleCargarEstado("horaInicio", textoEntrando, "hora")}
                                    value={hora.horaInicio}
                                    placeholder="00:00"
                                    style={[StylesCrearRecordatorio.input, { width: '68%' }]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                        </View>
                    </View>

                    {/**campo fecha con hora FIN*/}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Finalización</Text>

                        <View style={[{ flexDirection: 'row' }]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '55%' }]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando) => handleCargarEstado("fechaFin", textoEntrando, "fecha")}
                                    value={fecha.fechaFin}
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
                                    onChangeText={(textoEntrando) => handleCargarEstado("horaFin", textoEntrando, "hora")}
                                    value={hora.horaFin}
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
                        <Text style={[styles.textBoton, { color: 'white' }]}>Guardar</Text>
                    </TouchableOpacity>
                </View>
                {/**modal */}
                <ModalAlert
                    VisibleModal={visual}
                    setVisibleModal={()=>setVisual(!visual)}
                    textTitleModal={info.titulo}
                    textSubtilulo={info.subTitulo}
                    textParrafo={info.parrafo}
                    backgroundColor="#A3A3A380"
                    backgroundColorButton="#ffdd9b"
                />
            </SafeAreaView>
        </ScrollView>
    );
}

export default CrearRecordatorio;