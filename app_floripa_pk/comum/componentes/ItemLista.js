import { Pressable, StyleSheet, Text, View } from "react-native";
import CORES from "../../comum/constantes/cores";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import TELAS from "../constantes/telas";
import { useNavigation } from "@react-navigation/native";
import { limparStorage } from "../servicos/servicosStorage";

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: CORES.FUNDO_CARD,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 380,
  },
  texto: {
    fontSize: 22,
    marginLeft: 10,
  },
  icone: {
    marginRight: 10,
  },
  detalhesContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

const ItemLista = (props) => {


  const buscarIcone = (veiculo) => {
    switch (veiculo) {
      case "moto":
        return "motorbike";
      case "carro":
        return "car";
      case "van":
        return "van-passenger";
      case "caminhao":
        return "truck";
      default:
        return "help-circle";
    }
  };


  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(TELAS.TELA_DETALHES_VAGA, {
          vaga: props.item,
        })
      }
    >
      <View style={estilos.container}>
        <Icon
          name={buscarIcone(props.item.veiculo)}
          size={50}
          color="black"
          style={estilos.icone}
        />
        <View style={estilos.detalhesContainer}>
          <Text style={estilos.texto}>{props.item.nome_vaga}</Text>
          <Text style={estilos.texto}>Endereço: {props.item.logradouro}</Text>
          <Text style={estilos.texto}>Valor: R${props.item.valor}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemLista;
