import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, ScrollView } from "react-native";
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado";
import CampoTextoCustomizado from "../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado";
import TELAS from "../../comum/constantes/telas";
import api from "../../comum/servicos/api";
import {
  limparStorage,
  pegarItemStorage,
} from "../../comum/servicos/servicosStorage";
import { CHAVES_STORAGE } from "../../comum/constantes/ChavesStorage";
import { useToast } from "native-base";
import CORES from "../../comum/constantes/cores";

const estilos = StyleSheet.create({
  tudo: {
    flex: 1,
    marginTop: 10,
  },
  input: {
    padding: 10,
    width: 300,
    borderWidth: 2,
    margin: 15,
    fontSize: 20,
    borderRadius: 10,
  },
  botao_salvar: {
    alignItems: "center",
    backgroundColor: CORES.FUNDO_ESCURO,
    borderRadius: 30,
  },
  botao_excluir: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 30,
  },
});

const TelaEditarPerfil = (props) => {
  const toast = useToast();

  const [campoNome, setCampoNome] = useState("");
  const [campoEmail, setCampoEmail] = useState("");
  const [campoTelefone, setCampoTelefone] = useState("");
  const [campoNovaSenha, setCampoNovaSenha] = useState("");
  const [idCliente, setIdCliente] = useState(0);

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      const usuarioQueEstaNoStorage = await pegarItemStorage(
        CHAVES_STORAGE.USUARIO_LOGADO
      );
      if (usuarioQueEstaNoStorage) {
        setIdCliente(usuarioQueEstaNoStorage.id_cliente);
        setCampoNome(usuarioQueEstaNoStorage.nome_cliente);
        setCampoEmail(usuarioQueEstaNoStorage.email_cliente);
        setCampoTelefone(usuarioQueEstaNoStorage.telefone_cliente);
        setCampoNovaSenha(usuarioQueEstaNoStorage.senha_cliente);
      }
    };

    verificarUsuarioLogado();
  }, []);

  const salvar = async () => {
    try {
      const usuario = {
        id_cliente: idCliente,
        nome_cliente: campoNome,
        email_cliente: campoEmail,
        senha_cliente: campoNovaSenha,
        telefone_cliente: campoTelefone,
      };

      if (idCliente) {
        await api.put("/cliente", usuario);
        props.navigation.navigate(TELAS.TELA_LOGIN, { refresh: +new Date() });
        limparStorage(CHAVES_STORAGE.USUARIO_LOGADO);
        toast.show({
          description: "dados alterados com sucesso",
          placement: "top",
        });
      }
    } catch (error) {
      toast.show({
        description: error.response.data,
        placement: "top",
      });
    }
  };

  const excluir = async () => {
    try {
      if (confirm("tem certeza?")) {
        await api.delete("/cliente/" + idCliente);
        props.navigation.navigate(TELAS.TELA_LOGIN, { refresh: +new Date() });
        limparStorage(CHAVES_STORAGE.USUARIO_LOGADO);
        toast.show({
          description: "conta excluída",
          placement: "top",
        });
      }
    } catch (error) {
      toast.show({
        description: error.response.data,
        placement: "top",
      });
    }
  };

  return (
    <ScrollView style={estilos.tudo}>
      <View style={{ alignItems: "center" }}>
        {idCliente && (
          <CampoTextoCustomizado
            style={estilos.input}
            label="ID"
            value={idCliente}
            disabled
            readonly
          />
        )}

        <CampoTextoCustomizado
          style={estilos.input}
          label="Nome"
          value={campoNome}
          onChangeText={setCampoNome}
        />
        <CampoTextoCustomizado
          style={estilos.input}
          label="E-mail"
          value={campoEmail}
          onChangeText={setCampoEmail}
        />
        <CampoTextoCustomizado
          style={estilos.input}
          label="Telefone"
          value={campoTelefone}
          onChangeText={setCampoTelefone}
        />

        <CampoTextoCustomizado
          style={estilos.input}
          label="Nova Senha"
          value={campoNovaSenha}
          onChangeText={setCampoNovaSenha}
        />

        <BotaoCustomizado
          style={estilos.botao_salvar}
          cor="primaria"
          onPress={salvar}
        >
          Salvar
        </BotaoCustomizado>

        <BotaoCustomizado
          style={estilos.botao_excluir}
          cor="secundaria"
          onPress={excluir}
        >
          Excluir Conta
        </BotaoCustomizado>
      </View>
    </ScrollView>
  );
};

export default TelaEditarPerfil;
