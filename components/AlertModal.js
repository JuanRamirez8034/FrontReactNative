/**
 * Componente del Modal que funge como Alert
 */

import React from "react";
import {Text, ScrollView, View, TouchableOpacity} from "react-native";
import {styles, StylesModal} from './styles/Styles';

/**
 * Funcion principal del Alert Modal
 */
const AlertModal = ({onPress, informacion, colorBtnOcultar, textBtn, titulo}) =>{

    
    const Render = ()=>{
        let componente;
        let elemento = (title, info) =>{
            return(
                <View>
                    <Text style={[StylesModal.subtitulo]}>
                            {title}
                         </Text>
                         <Text style={[StylesModal.textoInfo]}>
                            {info}
                    </Text>
                </View>
            );
        }
        for(index in informacion){
            componente += elemento(index, informacion[index]);
        }
        return(componente);
    }

    return (
        <View style={[StylesModal.container]}>
            <View style={[StylesModal.containerCuerpo]}>
                <TouchableOpacity
                    style={[StylesModal.botonCerrar, {backgroundColor: (colorBtnOcultar === undefined ? 'orange' : colorBtnOcultar)}]}
                    onPress={onPress}
                >
                    <Text style={[styles.textlogo, { fontWeight: '600' }]}>{(textBtn === undefined ? 'OCULTAR' : textBtn)}</Text>
                </TouchableOpacity>
                <Text style={[StylesModal.titulo]}>{titulo}</Text>
                <View style={[StylesModal.cuerpoInformacion]}>
                    <ScrollView>
                            <Render/>         
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default AlertModal;