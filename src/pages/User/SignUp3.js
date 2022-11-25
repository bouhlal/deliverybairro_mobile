import React, {useState, useContext} from 'react';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { View, Image, Text, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logotipo from '../../../assets/logo.png';

export default function SignUp3(props) {
  const navigation = useNavigation();
// console.log(props.route.params.nome +' '+ props.route.params.sobrenome);

  const nome = props.route.params.nome;
  const sobrenome = props.route.params.sobrenome;
  const endereco = props.route.params.endereco;
  const complemento = props.route.params.complemento;
  const bairro = props.route.params.bairro;
  const cidade = props.route.params.cidade;
  const UF = props.route.params.UF;
  const CEP = props.route.params.CEP;

  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loading } = useContext(AuthContext);

  function checkEmptyField(field){
    if(field.trim()==='') {
      return false;
    } else {
      return true;
    }
  }

  function AddNewUser(){
    const vTelefone = checkEmptyField(telefone);
    const vEmail = checkEmptyField(email);
    const vPassword = checkEmptyField(password);

    if(!vTelefone || !vEmail || !vPassword) {
      alert('Dados obrigatórios');
    } else {
      signUp(
        nome.trim(),
        sobrenome.trim(),
        endereco.trim(),
        complemento.trim(),
        bairro.trim(),
        cidade.trim(),
        UF, CEP,
        telefone.trim(),
        email.trim(),
        password.trim()
      );
    }
  }

 return (
   <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={logotipo} style={{ width: 100, height: 100 }} resizeMode="contain" />
          <Text style={{fontSize: 21, fontWeight: 'bold'}}>Olá! {nome + ' ' + sobrenome}</Text>
          <Text style={{fontSize: 18, fontWeight: 'normal', textAlign: 'center', margin: 10}}>Já estamos concluindo, só mais um pouquinho...</Text>
          <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'center', margin: 10}}>Por favor, informe-nos um Telefone e E-mail válidos, defina uma Senha com mínimo de 06 caracteres, use somente números e/ou letras.</Text>
        </View>

        <AreaInput>
          <Input
            placeholder="Telefone"
            autoCorrect={false}
            autoCapitalize="none"
            value={telefone}
            keyboardType='numeric'
            onChangeText={(text) => setTelefone(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            keyboardType='numeric'
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </AreaInput>

        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 14, textAlign: 'center', marginLeft: 25, marginRight: 25}} >* Ao clicar em Concluir Cadastro, você estará concordando com a nossa Política de Uso e Privacidade.</Text>
        </View>

        <BtnSubmit onPress={() => AddNewUser()}>
          {
            loading ? (
              <View style={{
                flex:1, 
                flexDirection: 'row',
                position: 'absolute', 
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BtnTxt>Aguarde... </BtnTxt>
                <ActivityIndicator size='large' color='#FFF' />
              </View> 
            ) : (
              <BtnTxt>Concluir Cadastro</BtnTxt>
            )
          }
        </BtnSubmit>

        <BtnSubmit onPress={() => navigation.navigate('SignUp2')}>
          <BtnTxt>Voltar</BtnTxt>
        </BtnSubmit>

        <Link onPress={() => navigation.navigate('SignIn')}>
          <LinkTxt>Já tenho uma Conta!</LinkTxt>
        </Link>

      </Container>
   </Background>
  );
}
