import React, {useState, useContext} from 'react';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { View, Image, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import SelectUF from './SelectUF';
import logotipo from '../../../assets/logo.png';

export default function SignUp2(props) {
  const navigation = useNavigation();
  // console.log(props.route.params.nome +' '+ props.route.params.sobrenome);

  const nome = props.route.params.nome;
  const sobrenome = props.route.params.sobrenome;
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUf] = useState('MG');
  const [CEP, setCep] = useState('');

  const { loading } = useContext(AuthContext);

  function checkEmptyField(field){
    if(field.trim()==='') {
      return false;
    } else {
      return true;
    }
  }

  function avancar(){
    const vEndereco = checkEmptyField(endereco);
    const vBairro = checkEmptyField(bairro);
    const vCidade = checkEmptyField(cidade);
    const vCEP = checkEmptyField(CEP)

    if(!vEndereco || !vBairro || !vCidade || !vCEP) {
      alert('Dados obrigatórios');
    } else {
      navigation.navigate('SignUp3', {nome, sobrenome, endereco, complemento, bairro, cidade, UF, CEP})
    }
  }

 return (
   <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={logotipo} style={{ width: 100, height: 100 }} resizeMode="contain" />
          <Text style={{fontSize: 21, fontWeight: 'bold'}}>Olá! {nome + ' ' + sobrenome}</Text>
          <Text style={{fontSize: 18, fontWeight: 'normal', textAlign: 'center', margin: 5}}>Por favor, preencha o formulário abaixo com o seu endereço completo para entregas</Text>
        </View>

        <AreaInput>
          <Input
            placeholder="Endereço"
            autoCorrect={true}
            autoCapitalize="none"
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Complemento, Ex. Apto, Loja, etc."
            autoCorrect={true}
            autoCapitalize="none"
            value={complemento}
            onChangeText={(text) => setComplemento(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Bairro"
            autoCorrect={true}
            autoCapitalize="none"
            value={bairro}
            onChangeText={(text) => setBairro(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Cidade"
            autoCorrect={true}
            autoCapitalize="none"
            value={cidade}
            onChangeText={(text) => setCidade(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <AreaInput>
          <SelectUF
            onChange={setUf}
            uf={UF}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="CEP, Ex. 31000-000"
            autoCorrect={true}
            autoCapitalize="none"
            value={CEP}
            keyboardType='numeric'
            onChangeText={(text) => setCep(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <BtnSubmit onPress={() => { avancar() }}>
          <BtnTxt>Avançar</BtnTxt>
        </BtnSubmit>

        <BtnSubmit onPress={() => navigation.navigate('SignUp1')}>
          <BtnTxt>Voltar</BtnTxt>
        </BtnSubmit>

        <Link onPress={() => navigation.navigate('SignIn')}>
          <LinkTxt>Já tenho uma Conta!</LinkTxt>
        </Link>

      </Container>
   </Background>
  );
}
