import { StyleSheet, Text, TextInput, View } from "react-native"
import React from "react"

const CampoTextoCustomizado = (props) => {

    const estilos = StyleSheet.create({
        input: {
            border: '1px solid black',
        },
        texto: {
            fontSize: 22,
            fontWeight: 'bold'
        },
    })
    const [campoNome, setCampoNome] = React.useState('')

    return (
        <View>
            <Text style={estilos.texto}>{props.label}</Text>
            <TextInput style={estilos.input} onChangeText={setCampoNome} value={campoNome} {...props} />
        </View>
    )
}

export default CampoTextoCustomizado