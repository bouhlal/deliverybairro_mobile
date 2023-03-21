import React, {useState, useContext} from 'react';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { View, Image, Text, Keyboard, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/logomarca.png';

export default function SignUp1() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');

  const { loading } = useContext(AuthContext);

  function checkEmptyField(field){
    if(field.trim()==='') {
      return false;
    } else {
      return true;
    }
  }

  function avancar(){
    const vNome = checkEmptyField(nome);
    const vSobrenome = checkEmptyField(sobrenome);

    if(!vNome || !vSobrenome){
      alert('Dados obrigatórios');
    } else {
      navigation.navigate('SignUp2', {nome, sobrenome})
    }
  }

 return (
   <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={logo} style={{ width: 100, height: 100 }} resizeMode="contain" />
          <Image source={marca} style={{ width: 300, height: 100 }} resizeMode="contain" />
          <Text style={{fontSize: 21, fontWeight: 'bold'}}>Seja bem vindo!</Text>
          <Text style={{fontSize: 18}}>Cadastre-se! É simples e rápido.</Text>
        </View>

        <AreaInput>
          <Input
            placeholder="Nome, Ex. José"
            autoCorrect={true}
            autoCapitalize="none"
            value={nome}
            onChangeText={(text) => setNome(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Sobrenome, Ex. Silva"
            autoCorrect={true}
            autoCapitalize="none"
            value={sobrenome}
            onChangeText={(text) => setSobrenome(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <BtnSubmit onPress={() => { avancar() }}>
          <BtnTxt>Avançar</BtnTxt>
        </BtnSubmit>

        <Link onPress={() => navigation.navigate('SignIn')}>
          <LinkTxt>Já tenho uma Conta!</LinkTxt>
        </Link>

      </Container>
   </Background>
  );
}
