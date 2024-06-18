import React, { useEffect, useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native"
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado";
import cores from "../../comum/constantes/cores"
import TELAS from "../../comum/constantes/telas";
import ItemLista from "../../comum/componentes/ItemLista";
import ListagemVazia from "../../comum/componentes/ListagemVazia";
import SeparadorLista from "../../comum/componentes/SeparadorLista";
import api from "../../comum/servicos/api";


const estilos = StyleSheet.create({

   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 30,
   },
   botaoAnunciar: {
      height: 60,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cores.FUNDO_ESCURO,
   },
   botaoPerfil: {
      height: 60,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cores.FUNDO_CLARO,
   }

});

const TelaPrincipal = (props) => {
   const [vagas, setVagas] = useState([])

   useEffect(() => {
      const buscarVaga = async () => {
         const res = await api.get('/listar_vagas/')
         setVagas(res.data)
      }
      buscarVaga()
   }, [props.route.params?.refresh])

   return (

      <View style={estilos.container}>
         <BotaoCustomizado
            style={estilos.botaoAnunciar}
            onPress={() => props.navigation.navigate(TELAS.TELA_ANUNCIO)}
         >Anunciar Vaga</BotaoCustomizado>
         <FlatList
            data={vagas}
            renderItem={(props) => <ItemLista {...props} />}
            ListEmptyComponent={ListagemVazia}
            keyExtractor={(item) => item.id_vaga}
            ItemSeparatorComponent={SeparadorLista}
         />
      </View>

   )
}
export default TelaPrincipal