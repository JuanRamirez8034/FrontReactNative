/**
 * Componente del Movimiento Item
*/

import { View, Text, Image, TouchableOpacity } from "react-native";
import React,{useState, useEffect} from "react";
import { StylesTarea } from "./styles/Styles";
import ModalAlert from "./ModalAlert";

/**
 * Funcion principal del Movimiento Item
 */
const EgresoItem = ({ monto, motivo, fecha, id, navegar }) => {
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

    //Monto del proyecto solo con dos decimales
    const montoValido = parseFloat(monto).toFixed(2);

    /**
     * Return del componente
     */
    return (
        <TouchableOpacity style={[StylesTarea.container, { borderTopWidth: 0 }]} 
            onPress={() => { 
                    id===undefined || id === null ?
                    setInfo({titulo:"Alerta", subTitulo:"Egreso invalido", parrafo:"Esto no es un egreso, no se puede editar"}) :
                    navegar.navigate('CrearEgreso',{"id":id, "motivo":motivo, "monto":monto, "fecha":fecha})
                }
            }
        >
            {/**icono transaccion */}
            <Image
                source={require("../assets/icons/Egresos.png")}
                style={{ width: 40, height: 40, marginLeft: "3%", marginRight: "2%" }}
            />

            {/**informacion de la transaccion */}
            <View style={{ width: "55%", overflow: "hidden" }}>
                <Text style={[{ color: "black", fontSize: 19, fontWeight: "800" }]}>
                    {motivo === undefined ? "Titulo trasaccion" : motivo}
                </Text>
                <Text style={[{ fontSize: 15, fontWeight: "500" }]}>
                    {fecha !== undefined ? fecha.slice(0,10)+' '+fecha.slice(11,16) : "0000/00/00"}
                </Text>
            </View>

            {/**Monto de la transaccion */}
            <View
                style={{
                    width: "25%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "2%",
                    marginRight: "2%",
                }}
            >
                <Text style={[{ fontSize: 22, fontWeight: "700" }]}>
                    ${monto !== undefined ? montoValido.slice(0, -3) : "1000"},
                </Text>
                <Text style={[{ marginBottom: 5 }]}>
                    {monto !== undefined ? montoValido.slice(-2, monto.lenght) : "00"}
                </Text>
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
                alturaScrollModal='70%'
                textBtnOcultar='Entendido'
            />
        </TouchableOpacity>
    );
};

export default EgresoItem;
