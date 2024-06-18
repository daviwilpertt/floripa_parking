import { useNavigation } from "@react-navigation/native"
import { View, Pressable, StyleSheet } from "react-native"
import Icon from '@expo/vector-icons/Ionicons'
import TELAS from "../constantes/telas"


const estilos = StyleSheet.create({
    tudo: {
        flex: 1,
    }
})
const BotaoVoltar = () => {
    const navigation = useNavigation()

    const voltar = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate(TELAS.TELA_PRINCIPAL); // Substitua 'Home' pela tela que você deseja navegar
        }
    }
    return (
        <View style={estilos.tudo}>
            <Pressable style={estilos.botao} onPress={voltar}>
                <Icon name="arrow-back" color='black' size={36} />
            </Pressable>
        </View>
    )
}

export default BotaoVoltar