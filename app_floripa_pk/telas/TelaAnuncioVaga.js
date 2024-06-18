import { StyleSheet, ScrollView, Text, View } from "react-native"
import CampoTextoCustomizado from "../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado"
import { useState } from "react"
import TELAS from "../comum/constantes/telas"
import BotaoCustomizado from "../comum/componentes/BotaoCustomizado/BotaoCustomizado"
import CORES from "../comum/constantes/cores"
import api from "../comum/servicos/api"
import { useToast } from 'native-base';
import { Select } from 'native-base'



const TelaAnuncioVaga = (props) => {
    const toast = useToast()


    const estilos = StyleSheet.create({
        tudo: {
            flex: 1,

        },
        input: {
            padding: 5,
            width: 330,
            margin: 5,
            fontSize: 22,
            borderWidth: 2,
            borderRadius: 10
        },
        texto: {
            fontSize: 24,
            margin: 3
        },
        botao: {
            alignItems: 'center',
            backgroundColor: CORES.FUNDO_ESCURO,
            borderRadius: 30
        },
        viewSelect: {
            padding: 5,
            width: 330,
            margin: 5,
            fontSize: 22,
        },
        select: {
            fontSize: 18,
            borderWidth: 2,
        },

    })

    const [nomeVaga, setNomeVaga] = useState('')
    const [capacidade, setCapacidade] = useState('')
    const [valor, setValor] = useState('')
    const [veiculo, setVeiculo] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')

    const cadastrarVaga = async () => {
        try {
            const vaga = {
                nome_vaga: nomeVaga,
                capacidade: capacidade,
                valor: valor,
                veiculo: veiculo,
                logradouro: logradouro,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
            }
            console.log(vaga)
            await api.post('/adicionar_vaga', vaga)
            toast.show({
                description: 'vaga salva',
                placement: 'top',
            })
            props.navigation.navigate(TELAS.TELA_PRINCIPAL, { refresh: +new Date() })
        }
        catch (error) {
            toast.show({
                description: error.response.data,
                placement: 'top',
            })
        }
    }



    return (
        <ScrollView style={estilos.tudo}>
            <View style={{ alignItems: 'center' }}>

                <Text style={estilos.texto}>Informações da Vaga</Text>
                <CampoTextoCustomizado style={estilos.input} label='nome da vaga' value={nomeVaga} onChangeText={setNomeVaga} />
                <CampoTextoCustomizado style={estilos.input} label='capacidade' value={capacidade} onChangeText={setCapacidade} />
                <CampoTextoCustomizado style={estilos.input} label='valor mensal' value={valor} onChangeText={setValor} />
                <View style={estilos.viewSelect}>
                    <Select style={estilos.select}
                        selectedValue={veiculo}
                        placeholder="selecione o veiculo"
                        onValueChange={itemValue => setVeiculo(itemValue)}>
                        <Select.Item label="moto" value="moto" />
                        <Select.Item label="carro" value="carro" />
                        <Select.Item label="van" value="van" />
                        <Select.Item label="caminhão" value="caminhao" />
                    </Select>
                </View>
                <Text style={estilos.texto}>Endereço</Text>
                <CampoTextoCustomizado style={estilos.input} label='logradouro' value={logradouro} onChangeText={setLogradouro} />
                <CampoTextoCustomizado style={estilos.input} label='bairro' value={bairro} onChangeText={setBairro} />
                <CampoTextoCustomizado style={estilos.input} label='cidade' value={cidade} onChangeText={setCidade} />
                <CampoTextoCustomizado style={estilos.input} label='estado' value={estado} onChangeText={setEstado} />

                <BotaoCustomizado onPress={cadastrarVaga} style={estilos.botao}>cadastrar vaga</BotaoCustomizado>
            </View>
        </ScrollView>
    )
}

export default TelaAnuncioVaga