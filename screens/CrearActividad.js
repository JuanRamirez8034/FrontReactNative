/**
 * Archivo que contiene toda la estructura de importaciones de metodos y librerias
 * para realizar la interfaz grafica y logica de la pantalla de  crear actividad
 */
import React,{useState, useEffect, useRef} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, SafeAreaView} from "react-native";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin} from "../fuciones/validador";
import { registrarActividad} from "../requestBackend/API-Actividad";
import { consultaProyectos } from "../requestBackend/API-Proyectos";
import {styles, StylesCrearRecordatorio, StylesHome, StylesConsultaMovimientos} from '../components/styles/Styles'
import { StatusBar } from 'expo-status-bar';
import SelectDropdown from 'react-native-select-dropdown';
import { useIsFocused } from '@react-navigation/native';
import ModalAlert from "../components/ModalAlert";

const CrearActividad = (props) =>{
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
     * Constante que identifica la posiscion del usuario entre pantalla
     */
    const isFocus = useIsFocused();

    /**
     * Declaración de estados
     */
    // Estado para almacenar informacion de los proyectos consultados para registrar tareas
    const [proyectos, cargarProyectos] = useState([]);
    // Estado que contiene la informacion de la actividad a registrar
    const [infoActividad, cargarInfoActividad] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "descripcion": "",
        "fechaInicio":"", 
        "fechaFin":"",
        "estado":"Activo",
        "proyecto_idProyecto":""
    });
    // Estado que contiene la fecha inicial y final sin hora
    const [fecha, cargarFecha] = useState({"fechaInicio":fechaActual.slice(0, 10), "fechaFin":""});
    // Estado que contiene la hora inicial y final sin fecha
    const [hora, cargarHora] = useState({"horaInicio":fechaActual.slice(11, 16), "horaFin":""});
    // Estado para utilizar la modal "ModalAlert" (hacer visible)
    const [visual, setVisual] = useState(false);
    // Estado para utilizar la modal "ModalAlert" (Informacion del modal)
    const [info, setInfo] = useState({"titulo":"","subTitulo":"", "parrafo":""});

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
     * Funcion para llamar los proyectos ada vez que se acceda a la pantalla de crear actividad
     */
    const traerDataProyectos = async () =>{
        const data = await consultaProyectos({"sesion": true, "idSesion" : infousuario.idPersona});
        cargarProyectos(data);
    }

    /**
     * Funcion para accionar la consulta de la informacion de los proyectos y restablecer los campos
     * cada vez que se acceda a la pantalla
     */
    useEffect(()=>{
        traerDataProyectos();
        restablecerCampos();
    },[isFocus]);

    /**
     * Funcion para restablecer todos los estados al estado inicial
     */
    const restablecerCampos = ()=>{
        cargarInfoActividad({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "fechaInicio":"", 
            "fechaFin":"",
            "estado":"Activo",
            "proyecto_idProyecto":""
        });
        cargarFecha({"fechaInicio":fechaActual.slice(0, 10), "fechaFin":""});
        cargarHora({"horaInicio":fechaActual.slice(11, 16), "horaFin":""});
        selectListRestablecer();
        //setInfo({"titulo":"","subTitulo":"", "parrafo":""});
    }
    
    /**
     * Funcion para restablecer la lista de proyectos cada vez que se acceda a la pantalla
     * utilizando useRef()
     */
    const referenciaSelectList = useRef({});
    const selectListRestablecer = () => {referenciaSelectList.current.reset();}

    /**
     * Función para modificar los valores de los estados
     */
    const handleCargarEstado = (index,valor, tipoState) =>{
        if(tipoState === "infoActividad"){
           cargarInfoActividad({...infoActividad, [index]:valor}); 
        }
        if(tipoState === "fecha"){
            cargarFecha({...fecha, [index]:valor}); 
        }
        if(tipoState === "hora"){
            cargarHora({...hora, [index]:valor}); 
        }
        //console.log(JSON.stringify(infoActividad));
    }

    /**
     * funcion para verificar datos antes del proceso de registro de actividad nueva
     */
    const validarCampos = () =>{
        if(infoActividad.proyecto_idProyecto===''|| infoActividad.proyecto_idProyecto ===null){
            setInfo({"titulo":"Alerta","subTitulo":"Proyecto invalido", "parrafo":"En el campo \'proyecto\' debe seleccionar un proyecto"});
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
        if(infoActividad.descripcion===''|| infoActividad.descripcion ===null){
            setInfo({"titulo":"Alerta","subTitulo":"Descripcion invalida", "parrafo":"El campo \'descripción\' no puede estar vacio"});
            return;
        }
        ////////////////////////////////////
        cargarInfoActividad({...infoActividad, "fechaInicio":`${fecha.fechaInicio}T${hora.horaInicio}:00`, "fechaFin":`${fecha.fechaFin}T${hora.horaFin}:00`});
        /////////////////////////////////
        
    }

    /**
     * Funcion para verificar el rango de las fechas correcto
     * solo se ejecuta una vez modificado la fecha en el el 
     * "infoActividad"
     */
    useEffect(()=>{
        console.log("Me he ejecutado");
        if(infoActividad.fechaInicio!=="" && infoActividad.fechaFin!==""){
            if(!validarRangoFechaInicioFin(infoActividad)){
                setInfo({"titulo":"Alerta","subTitulo":"Rango de tiempo invalido", "parrafo":`La fecha incial "${infoActividad.fechaInicio}" no puede ser mayor a la fecha final "${infoActividad.fechaFin}"`});
                cargarInfoActividad({...infoActividad, "fechaInicio":"", "fechaFin":""});
                return;
            }
            handleCrearActividad();
        }
    },[infoActividad.fechaFin])

    /**
     * Funcion para accionar el proceso de resgitro de actividad nueva
     */
    const handleCrearActividad= async () =>{
        console.log(infoActividad);
        const data = await registrarActividad(infoActividad);
        if(data.registro === true){
            setInfo({"titulo":"Registro actividad","subTitulo":"Información de registro", "parrafo":`Actividad : "${infoActividad.descripcion}" para el proyecto: "${infoActividad.proyecto_idProyecto}"\n CREADA CON EXITO`});

            restablecerCampos();
        }else{
            setInfo({"titulo":"Error de registro","subTitulo":"Información de error", "parrafo":`Ha ocurrido un error durante el registro: ${data.resultado}`});
        }
    }

    return (
        <ScrollView style={[StylesHome.container]}>
            
            
            <SafeAreaView  style={[StylesConsultaMovimientos.todoAlto]}>
                
                {/* {<StatusBar backgroundColor="white" translucent={true} /> } */}
                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo]} source={require('../assets/icons/Logo-sup.png')}/>
                
                {/* Contenedor del form */}
                <View style={[StylesCrearRecordatorio.containerFormulario,{ alignItems: 'center' , height:'80%'}]}>
                    <Image style={[StylesCrearRecordatorio.lineasup, {marginBottom: 30}]} source={require('../assets/icons/Linea-sup.png')}/>
                    
                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo,{height:33, width:30}]} source={require('../assets/icons/Actividad.png')}/>
                        <Text style={StylesCrearRecordatorio.saludo}>Actividad</Text>
                    </View>

                    {/**lista select */}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>
                        <SelectDropdown
                            data={proyectos}
                            onSelect={(selectedItem, index) => {
                                handleCargarEstado("proyecto_idProyecto", selectedItem.idProyecto, "infoActividad");
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return `${selectedItem.descripcion.slice(0, 30)}...`
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return `${item.descripcion.slice(0, 25)}...`
                            }}
                            buttonStyle={{width:'100%', borderBottomWidth:1.5, borderBottomColor:'#B3B3B3', backgroundColor:'white'}}
                            buttonTextStyle={{color:'#B3B3B3', fontWeight:'600'}}
                            dropdownStyle={{borderRadius:10, padding:5, backgroundColor:'white'}}
                            dropdownOverlayColor='#B3B3B315'
                            rowStyle={{backgroundColor:'#B3B3B310', borderRadius:5, marginBottom:1}}
                            rowTextStyle={{color:'#B3B3B3', fontWeight:'500'}}
                            selectedRowStyle={{backgroundColor:'#ffdb6f'}}
                            selectedRowTextStyle={{color:'white'}}
                            search={true}
                            searchPlaceHolder={"Buscar"}
                            searchInputStyle={{borderBottomWidth:1, borderBottomColor:'#B3B3B3',}}
                            searchInputTxtColor={"#B3B3B3"}
                            defaultButtonText={"SELECCIONAR PROYECTO"}
                            ref={referenciaSelectList}
                        />
                    </View>

                    {/**campo fecha con hora INCIO */}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Incio</Text>

                        <View style={[{flexDirection:'row'}]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual,{width:'55%'}]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando)=>handleCargarEstado("fechaInicio",textoEntrando,"fecha")}
                                    value={fecha.fechaInicio}
                                    placeholder="año/mes/dia"
                                    style={[StylesCrearRecordatorio.input]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                            
                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '40%', marginLeft:'5%'}]}>
                                <Image
                                    source={require('../assets/icons/Tag_Tiempo.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando)=>handleCargarEstado("horaInicio",textoEntrando,"hora")}
                                    value={hora.horaInicio}
                                    placeholder="00:00"
                                    style={[StylesCrearRecordatorio.input,{width:'68%'}]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                        </View>
                    </View>

                    {/**campo fecha con hora FIN*/}
                    <View style={[StylesCrearRecordatorio.containerInputDoble]}>

                        <Text style={[StylesCrearRecordatorio.inputTitulo]}>Finalización</Text>

                        <View style={[{flexDirection:'row'}]}>

                            <View style={[StylesCrearRecordatorio.containerInputDual,{width:'55%'}]}>
                                <Image
                                    source={require('../assets/icons/Tag_Inicio_Final.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando)=>handleCargarEstado("fechaFin",textoEntrando,"fecha")}
                                    value={fecha.fechaFin}
                                    placeholder="año/mes/dia"
                                    style={[StylesCrearRecordatorio.input]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                            
                            <View style={[StylesCrearRecordatorio.containerInputDual, { width: '40%', marginLeft:'5%'}]}>
                                <Image
                                    source={require('../assets/icons/Tag_Tiempo.png')}
                                    style={[StylesCrearRecordatorio.dualInputPNG]}
                                />
                                <TextInput
                                    onChangeText={(textoEntrando)=>handleCargarEstado("horaFin",textoEntrando,"hora")}
                                    value={hora.horaFin}
                                    placeholder="00:00"
                                    style={[StylesCrearRecordatorio.input,{width:'68%'}]}
                                    placeholderTextColor="#B3B3B3"
                                />
                            </View>
                        </View>
                    </View>
    
                    {/*Entrada descripcion*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_Título_del_Tag.png')}
                            style={[StylesCrearRecordatorio.inputPNG]}
                        />
                        <TextInput
                            onChangeText={(textoEntrando)=>handleCargarEstado("descripcion",textoEntrando,"infoActividad")}
                            value={infoActividad.descripcion}
                            placeholder="Descripción"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>

                    {/*Button */}
                    <TouchableOpacity
                        style={[styles.boton,{backgroundColor:'#00CE97', marginBottom:100}]}
                        onPress={validarCampos}
                    >
                        <Text style={[styles.textBoton, {color:'white'}]}>Guardar</Text>
                    </TouchableOpacity>
                </View>
                {/**Modal alert */}
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


export default CrearActividad;