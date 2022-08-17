/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de  consulta movimientos
 */
import React,{useState, useEffect} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity,  Vibration} from "react-native";
import { styles, StylesCrearRecordatorio, StylesListaMovimientos , StylesConsultaMovimientos, StylesHomeFinanzas } from "../components/styles/Styles";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin } from "../fuciones/validador";
import { consultaMovimientos } from "../requestBackend/API-Consultas";
import ListaMovientosItems from "../components/ListaMovientosItems";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
import ModalAlert from "../components/ModalAlert";


const ConsultaMovimientos = (props) =>{
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
     * Constante que identifica la posiscion del usuario entre pantalla
     */
    const isFocus = useIsFocused();

    /**
     * Declaración de estados
     */
    // Estado que contiene el valor boolean para utilizar en onRefresh
    const [estadoActualizar, setEstadoActualizar] = useState(false);
    // Estado que contiene la fecha inicio y fial para la onsulta por rango
    const [fechasMovimientos, cargarfechasMovimientos] = useState({
        "fechaInicio": "",
        "fechaFin": ""
    });
    // estado contenedor del resultado de la busqueda de movimientos
    const [dataMovimientos, setDataMovimientos] = useState([
        {"motivo":"No posee movimientos", 
        "monto":"0,00", 
        "fecha":"0000/00/00 00:00", 
        "proyecto_idProyecto":null, 
        "persona_idPersona":null, 
        "idEgreso":null}
    ]);
    // Estado para utilizar la modal "ModalAlert" (hacer visible)
    const [visual, setVisual] = useState(false);
    // Estado para utilizar la modal "ModalAlert" (Informacion del modal)
    const [info, setInfo] = useState({"titulo":"","subTitulo":"", "parrafo":""});
    
    /**
     * Funcion para realizar consulta de movimientos por mes cada vez que el usuario 
     * acceda a la pantalla
     */
    useEffect(()=>{
        restablecerCampos();
        obtenerMovimientos("Mensual");
    },[isFocus]);

    /**
     * Efecto para llamar a la modal cada vez que hayan cambios en el contenido
     * del estado info
     */
    useEffect(()=>{
        if(info.subTitulo==="" || info.parrafo ==="" || info.titulo===""){return}
        setVisual(true);
    },[info]);

    /**
     * Funcion para restablecer la informacion del modal ("ModalAlert")
     */
    useEffect(()=>{
        if(visual === false){
            setInfo({"titulo":"","subTitulo":"","parrafo":""});
        }
    },[visual]);

    /**
     * Funcion para restablecer todos los estados al estado inicial
     */
    const restablecerCampos = ()=>{
        cargarfechasMovimientos({
            "fechaInicio": "",
            "fechaFin": ""
        });
    }

    /**
     * Función para modificar los valores de los estados
     */
    const handleCargarEstado = (index,valor) =>{
        cargarfechasMovimientos({...fechasMovimientos, [index]:valor}); 
        //console.log(JSON.stringify(fechasMovimientos));
    }

    /**
     * funcion para verificar datos antes del proceso de consulta de movimientos por rango
     */
    const validarCampos = () =>{
        
        let resultado = validarDatosRegistroPersona(fechasMovimientos)
        if(resultado.result !== true){
            setInfo({"titulo":"Consulta movimientos","subTitulo":"Fecha invalida", "parrafo":resultado.alerta});
            return;
        }

        if(!validarRangoFechaInicioFin(fechasMovimientos)){
            setInfo({"titulo":"Consulta movimiento","subTitulo":"Rango de tiempo invalido", "parrafo":`La fecha incial "${fechasMovimientos.fechaInicio}" no puede ser mayor a la fecha final "${fechasMovimientos.fechaFin}"`});
            return;
        }
        obtenerMovimientos("Rango")
    }

    /**
     * Funcion para cargar el estado con la informacion de los moviemientos
     * a un estado por defecto
     */
    const cargarMovimientoDefault = () => {
        setDataMovimientos([
            {"motivo":"No posee movimientos", 
            "monto":"0,00", 
            "fecha":"0000/00/00 00:00", 
            "proyecto_idProyecto":null, 
            "persona_idPersona":null, 
            "idEgreso":null}
        ]);
    }

    /**
     * Funcion para accionar el proceso de consulta de movimientos 
     */
    const obtenerMovimientos = async (periodo) =>{
        if(periodo === "Mensual"){
            const data = await consultaMovimientos({
                "sesion": true,
                "idSession": infoUsuario.idPersona,
                "fecha": fechaActual,
                "tipo": "Mensual"
            });
            //console.log(JSON.stringify(data));
            if(data.length !== 0){
                setDataMovimientos(data);
            }else{
                cargarMovimientoDefault();
            }
        }

        if(periodo === "Anual"){
            const data = await consultaMovimientos({
                "sesion": true,
                "idSession": infoUsuario.idPersona,
                "fecha": fechaActual,
                "tipo": "Anual"
            });
            //console.log(JSON.stringify(data));
            if(data.length !== 0){
                setDataMovimientos(data);
            }else{
                cargarMovimientoDefault();
            }
        }

        if(periodo === "Rango"){
            const data = await consultaMovimientos({
                "sesion": true,
                "idSession": infoUsuario.idPersona,
                "fechaInicio": fechasMovimientos.fechaInicio,
                "fechaFin":fechasMovimientos.fechaFin,
                "tipo": "Rango"
            });
            //console.log(JSON.stringify(data));
            if(data.length !== 0){
                setDataMovimientos(data);
            }else{
                cargarMovimientoDefault();
            }
        }

    }

    return (
        <View style={[StylesConsultaMovimientos.todoAlto, StylesHomeFinanzas.colorFondo]}>
        
            <SafeAreaView>
                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo,{marginVertical:'15%'}]} source={require('../assets/icons/Logo-sup.png')} />

                {/**formulario contenedor */}
                <View style={[StylesCrearRecordatorio.containerFormulario ]}>

                    <Image style={[StylesCrearRecordatorio.lineasup, { marginBottom: 30 }]} source={require('../assets/icons/Linea-sup.png')} />

                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo, { height: 30, width: 35 }]} source={require('../assets/icons/Billetera.png')} />
                        <Text style={StylesCrearRecordatorio.saludo}>Consultas</Text>
                    </View>

                    {/**campo rango de fecha*/}
                    <View style={[StylesConsultaMovimientos.containerInputDoble]}>
                        <Text style={[StylesConsultaMovimientos.textInputDoble]}>entre</Text>
                        <TextInput
                            onChangeText={(textoEntrando)=>handleCargarEstado("fechaInicio",textoEntrando)}
                            value={fechasMovimientos.fechaInicio}
                            placeholder={fechaActual}
                            style={[StylesConsultaMovimientos.input]}
                            placeholderTextColor="#B3B3B3"
                        />
                        <Text style={[StylesConsultaMovimientos.textInputDoble]}>a</Text>
                        <TextInput
                            onChangeText={(textoEntrando)=>handleCargarEstado("fechaFin",textoEntrando)}
                            value={fechasMovimientos.fechaFin}
                            placeholder={fechaActual}
                            style={[StylesConsultaMovimientos.input]}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*Button */}
                    <View style={[{flexDirection:'row', alignItems:'flex-start', width:'80%'}]}>
                    <TouchableOpacity
                        style={[StylesListaMovimientos.botonPequeno, { backgroundColor: '#00ce97', marginBottom:5 }]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, { color: 'white' }]}>CONSULTAR</Text>
                    </TouchableOpacity>
                    </View>
                    {/**Lista de movimientos*/}
                    <ListaMovientosItems
                        estadoActualizar={estadoActualizar}
                        setEstadoActualizar={setEstadoActualizar}
                        datas={dataMovimientos}
                        accionarConsulta={obtenerMovimientos}
                    />
                </View>
                {/**Modal alert */}
                <ModalAlert
                    VisibleModal={visual}
                    setVisibleModal={()=>setVisual(!visual)}
                    textTitleModal={info.titulo}
                    textSubtilulo={info.subTitulo}
                    textParrafo={info.parrafo}
                    backgroundColor="#A3A3A380"
                    backgroundColorButton="#97e5d0"
                />
            </SafeAreaView>
        </View>
    );
}

export default ConsultaMovimientos;