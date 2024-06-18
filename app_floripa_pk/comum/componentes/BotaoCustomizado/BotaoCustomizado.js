import { Pressable, Text, StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  botao: {
    padding: 16,
    margin: 5,
    width: 320,
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold'
  },
})


const BotaoCustomizado = (props) => {

  return (
    <Pressable style={[estilos.botao, props.style]} onPress={props.onPress}>
      <Text style={estilos.texto}>{props.children}</Text>
    </Pressable>
  );
};

export default BotaoCustomizado;
