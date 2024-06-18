
import { FlatList, Image, StyleSheet, View } from "react-native";
import CampoTextoCustomizado from "../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado";
import BotaoCustomizado from "../comum/componentes/BotaoCustomizado/BotaoCustomizado";
import React, { useEffect, useState } from "react";
import TELAS from "../comum/constantes/telas";
import { CHAVES_STORAGE } from "../comum/constantes/ChavesStorage";
import api from "../comum/servicos/api";
import { atualizarItemStorage } from "../comum/servicos/servicosStorage";
import { useToast } from "native-base";
import CORES from "../comum/constantes/cores";


const estilos = StyleSheet.create({
  tudo: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  icone: {
    alignItems: "center",
  },
  input: {
    padding: 10,
    width: 300,
    borderWidth: 2,
    margin: 10,
    fontSize: 20,
    borderRadius: 10
  },
  botao: {
    backgroundColor: CORES.FUNDO_ESCURO,
    alignItems: "center",
    borderRadius: 40,
    width: 240,
    margin: 10,
  },
  texto: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "right",
  },
  image: {
    height: 240,
    width: 240,
    resizeMode: 'contain',
  },
});

const TelaLogin = (props) => {
  const toast = useToast()

  const [clientes, setClientes] = useState([])
  const [campoEmail, setEmail] = useState('');
  const [campoSenha, setSenha] = useState('');

  const entrar = async () => {
    try {
      const response = await api.post("/logar", {
        email_cliente: campoEmail,
        senha_cliente: campoSenha
      });

      await atualizarItemStorage(CHAVES_STORAGE.USUARIO_LOGADO, response.data);
      props.navigation.navigate(TELAS.TELA_PRINCIPAL);

    } catch (error) {
      toast.show({
        description: error.response.data,
        placement: 'top',
      });
    }
  };

  useEffect(() => {
    const buscarUsuario = async () => {
      const res = await api.get('/cliente')
      setClientes(res.data)
    }
    buscarUsuario()
  }, [])

  return (
    <View style={estilos.tudo}>
      <Image
        source={require('../assets/logo.png')} // URL da imagem
        style={estilos.image}
      />
      <CampoTextoCustomizado
        style={estilos.input}
        label="Email"
        value={campoEmail}
        onChangeText={setEmail}
      />
      <CampoTextoCustomizado
        style={estilos.input}
        label="Senha"
        value={campoSenha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <BotaoCustomizado style={estilos.botao} onPress={entrar}>
        Entrar
      </BotaoCustomizado>

      <BotaoCustomizado style={estilos.botao} onPress={() => {
        props.navigation.navigate(TELAS.TELA_CADASTRO)
      }}
      >
        Novo Cadastro
      </BotaoCustomizado>


    </View>
  );

};

export default TelaLogin;
