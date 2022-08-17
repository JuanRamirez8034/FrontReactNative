import React,{useState} from "react";
import { View, Text, ScrollView, TextInput, Image , TouchableOpacity, Alert, Vibration, StyleSheet, Dimensions, SafeAreaView} from "react-native";
import useContextUsuario from "../hook/useContextUsuario";
import { validarDatosRegistroPersona, validarRangoFechaInicioFin, validarHora } from "../fuciones/validador";
import HeaderMenuPersonalizado from "../components/HeaderMenuPersonalizado";
import {styles, StylesCrearRecordatorio} from '../components/styles/Styles'
import { StatusBar } from 'expo-status-bar';
import SelectDropdown from 'react-native-select-dropdown';

const CrearTags = (props) =>{
    // utilizando contexto de usuario
    const infousuario = useContextUsuario();
    const fechaActual = new Date().toISOString().slice(0, 10);

    const [infoActividad, cargarInfoActividad] = useState({
        "sesion": true,
        "idSesion": infousuario.idPersona,
        "titulo":"",
        "descripcion": "",
        "fechaInicio":"", 
        "fechaFin":"",
        "estado":"Activo",
        "proyecto_idProyecto":""
    });
    const [fecha, cargarFecha] = useState({"fechaInicio":"", "fechaFin":""});
    const [hora, cargarHora] = useState({"horaInicio":"", "horaFin":""});
    // funcion para restablecer los campos input
    const restablecerCampos = ()=>{
        cargarInfoActividad({
            "sesion": true,
            "idSesion": infousuario.idPersona,
            "descripcion": "",
            "monto":"",
            "fechaInicio":fechaActual, 
            "fechaFin":fechaActual.slice(0 , 8),
            "estado":"Activo"
        });
    }
    //funcion para actualizar cada uno de los elementos del estado inicial
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
    // funcion para validar los campos antes de enviar
    const validarCampos = () =>{
        
        if(infoActividad.titulo===''|| infoActividad.titulo ===null){
            Alert.alert(
                'Título invalido', 'El campo \'título\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
        
        
        let resultado = validarDatosRegistroPersona(fecha);
        if(resultado.result != true){
            Alert.alert(
                'Fecha invalida', resultado.alerta,[{text:'Entiendo'}]
            );
            return;
        }
        resultado = validarDatosRegistroPersona(hora);
        if(resultado.result != true){
            Alert.alert(
                'Hora invalida', resultado.alerta,[{text:'Entiendo'}]
            );
            return;
        }
        ////////////////////////////////////
        const fecha_inicio = `${fecha.fechaInicio}T${hora.horaInicio}:00`;
        const fecha_fin = `${fecha.fechaFin}T${hora.horaFin}:00`;
        cargarInfoActividad({...infoActividad, "fechaInicio":fecha_inicio, "fechaFin":fecha_fin});
        const intervalo = setInterval(()=>{console.log()})
        
        /////////////////////////////////
        if(!validarRangoFechaInicioFin(infoActividad)){
            Alert.alert(
                'Rango de tiempo invalido', `La fecha incial "${infoActividad.fechaInicio}" no puede ser mayor a la fecha final "${infoActividad.fechaFin}"`,[{text:'Entiendo'}]
            );
            return;
        }
        if(infoActividad.descripcion===''|| infoActividad.descripcion ===null){
            Alert.alert(
                'Descripcion invalida', 'El campo \'descripción\' no puede estar vacio',[{text:'Entiendo'}]
            );
            return;
        }
    }

    // funcion para realizar el registro
    const handleCrearActividad= async () =>{
        
    }
    const countries = [{"nombre":"pablo", "apellido":"lopez"},{"nombre":"manuel", "apellido":"perez"},{"nombre":"Maria", "apellido":"fernanda"},];
    return (
        <SafeAreaView style={[{backgroundColor: '#ffdb6f'},StylesCrearRecordatorio.container]}>
            <StatusBar backgroundColor="#ffdb6f" translucent={true} />
            <ScrollView  contentContainerStyle={{}}>
                {/* Logo */}
                <Image style={[StylesCrearRecordatorio.logo]} source={require('../assets/icons/Logo-sup.png')}/>
                
                {/* Contenedor del form */}
                <View style={StylesCrearRecordatorio.containerFormulario}>
                    <Image style={[StylesCrearRecordatorio.lineasup, {marginBottom: 30}]} source={require('../assets/icons/Linea-sup.png')}/>
                    
                    {/* Saludo */}
                    <View style={[StylesCrearRecordatorio.containerSaludo]}>
                        <Image style={[StylesCrearRecordatorio.iconoSaludo]} source={require('../assets/icons/Icon-tags-color.png')}/>
                        <Text style={StylesCrearRecordatorio.saludo}>Tags</Text>
                    </View>
                    {/**lista select */}
                    <View style={[StylesCrearRecordatorio.containerInputDoble,{marginBottom:10}]}>
                        <SelectDropdown
                            data={countries}
                            onSelect={(selectedItem, index) => {
                                handleCargarEstado("proyecto_idProyecto", selectedItem.nombre, "infoActividad");
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.nombre
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.nombre
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
                        />
                    </View>
                    {/*Entrada titulo*/}
                    <View style={[StylesCrearRecordatorio.containerInput]}>
                        <Image
                            source={require('../assets/icons/Tag_Título_del_Tag.png')}
                            style={[StylesCrearRecordatorio.inputPNG]}
                        />
                        <TextInput
                            onChangeText={(textoEntrando)=>handleCargarEstado("titulo",textoEntrando,"infoActividad")}
                            value={infoActividad.titulo}
                            placeholder="Titulo"
                            style={styles.input}
                            placeholderTextColor="#B3B3B3"
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
                                    placeholder="00:00 am"
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
                                    placeholder="00:00 am"
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
            </ScrollView>
        </SafeAreaView>
    );
}


export default CrearTags;