import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CHAVES_STORAGE } from "./comum/constantes/ChavesStorage";
import TELAS from "./comum/constantes/telas";
import { pegarItemStorage } from "./comum/servicos/servicosStorage";
import TelaAnuncioVaga from "./telas/TelaAnuncioVaga";
import TelaCadastro from "./telas/TelaCadastro";
import TelaDetalhesVaga from "./telas/TelaDetalhesVaga";
import TelaEditarPerfil from "./telas/TelaEditarPerfil/TelaEditarPerfil";
import TelaLogin from "./telas/TelaLogin";
import TelaPrincipal from "./telas/TelaPrincipal/TelaPrincipal";
import CabecalhoCustomizado from "./comum/componentes/CabecalhoCustomizado";
import BotaoVoltar from "./comum/componentes/BotaoVoltar";

// useEffect(() => {
//   buscarStorage();
// }, []);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    textAlign: "center",
  },
});

const Stack = createStackNavigator();

export default function App() {
  const [usuarioLogado, setUsuariologado] = useState();
  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      const usuarioNoStorage = await pegarItemStorage(
        CHAVES_STORAGE.USUARIO_LOGADO
      );
      setUsuariologado(usuarioNoStorage);
    };
    verificarUsuarioLogado();
  }, []);
  if (usuarioLogado === undefined) {
    return <></>;
  }
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={usuarioLogado ? TELAS.TELA_PRINCIPAL : TELAS.TELA_LOGIN}
            screenOptions={{ cardStyle: { flex: 1 }, header: CabecalhoCustomizado }}>
            <Stack.Screen name={TELAS.TELA_PRINCIPAL} component={TelaPrincipal} />

            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name={TELAS.TELA_LOGIN} component={TelaLogin} />
            </Stack.Group>

            <Stack.Group screenOptions={{ header: BotaoVoltar }}>
              <Stack.Screen name={TELAS.TELA_CADASTRO} component={TelaCadastro} />
              <Stack.Screen name={TELAS.TELA_DETALHES_VAGA} component={TelaDetalhesVaga} />
              <Stack.Screen name={TELAS.TELA_ANUNCIO} component={TelaAnuncioVaga} />
              <Stack.Screen name={TELAS.TELA_EDITAR_PERFIL} component={TelaEditarPerfil} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </NativeBaseProvider>
  );
}
