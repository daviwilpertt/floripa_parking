import { StyleSheet, View } from "react-native"
import CORES from "../constantes/cores"

const SeparadorLista = () => {

    const estilos = StyleSheet.create({
        tudo: {
            height: 10,
        },
    })

    return <View style={estilos.tudo}>
    </View>
}

export default SeparadorLista