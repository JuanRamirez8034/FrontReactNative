import React,{useEffect, useState} from 'react';
import { Text, TouchableOpacity} from 'react-native';
import ModalAlert from './ModalAlert';
import { styles } from './styles/Styles';

const BotonEliminar = ({ accionEliminar, textBoton = "Accionar", colorText = 'white', colorBoton = '#00CE97' }) => {
    /**
     * Declaracion de estados
     */
    // Estado para utilizar la modal "ModalAlert" (hacer visible)
    const [visual, setVisual] = useState(false);
    // Estado para utilizar la modal "ModalAlert" (Informacion del modal)
    const [info, setInfo] = useState({"titulo":"","subTitulo":"", "parrafo":""});

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
    
    return (
        <TouchableOpacity
            style={[styles.boton, { backgroundColor: colorBoton, marginVertical:0 }]}
            onPress={()=>{
                setInfo({ 
                    "titulo": "Alerta", 
                    "subTitulo": "¿Está seguro de eliminar este contenido?", 
                    "parrafo": "Oprima \"Eliminar\" si desea continuar con el proceso o \"Cancelar\" si cambia de opinión" })
                }
            }
        >
            <Text style={[styles.textBoton, { color: colorText }]}>{textBoton}</Text>
            {/**Modal alert */}
            <ModalAlert
                VisibleModal={visual}
                setVisibleModal={() => setVisual(!visual)}
                textTitleModal={info.titulo}
                textSubtilulo={info.subTitulo}
                textParrafo={info.parrafo}
                backgroundColor="#A3A3A380"
                backgroundColorButton="#97e5d0"
                alturaScrollModal='57%'
                textBtnNavegar='Eliminar'
                textBtnOcultar='Cancelar'
                backgroundColorBtnNavegar='red'
                navegar={accionEliminar}
            />
        </TouchableOpacity>
    );
}

export default BotonEliminar;