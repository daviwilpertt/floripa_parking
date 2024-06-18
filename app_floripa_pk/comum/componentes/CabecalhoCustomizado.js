import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { pegarItemStorage } from "../servicos/servicosStorage";
import TELAS from "../constantes/telas";
import { CHAVES_STORAGE } from "../constantes/ChavesStorage";
import CORES from "../constantes/cores";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'

const estilos = StyleSheet.create({
    tudo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: CORES.FUNDO_MAIS_ESCURO,
        height: 48,
        padding: 5,
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    perfil: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const CabecalhoCustomizado = (props) => {

    useEffect(() => {
        const verificarSeUsuarioEstaLogado = async () => {
            const usuarioQueEstaNoStorage = await pegarItemStorage(CHAVES_STORAGE.USUARIO_LOGADO);
            setUsuarioLogado(usuarioQueEstaNoStorage);
        };

        verificarSeUsuarioEstaLogado();
    }, []);

    return (
        <View style={estilos.tudo}>
            <Pressable style={estilos.botao} onPress={() => props.navigation.navigate(TELAS.TELA_LOGIN)}>
                <Ionicons name="exit-outline" size={48} color={CORES.FUNDO_ESCURO} />

            </Pressable>
            <Pressable style={estilos.perfil} onPress={() => props.navigation.navigate(TELAS.TELA_EDITAR_PERFIL)}>
                <FontAwesome name="user-circle" size={48} color={CORES.FUNDO_CLARO} />
            </Pressable>
        </View>
    );
};

export default CabecalhoCustomizado;
