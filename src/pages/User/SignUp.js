import React, {useState, useContext} from 'react';
import { StyleSheet, View, Image, Text, Keyboard, Alert, Platform } from 'react-native';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/logomarca.png';

export default function SignUp1() {
  const navigation = useNavigation();
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

  function RegisterUser(){
    const vEmail = checkEmptyField(email);
    const vPassword = checkEmptyField(password);

    if(!vEmail || !vPassword) {
      alert('Dados obrigatórios');
    } else {
      signUp(
        email.trim(),
        password.trim()
      );
      Alert.alert("Atenção","Um código de confirmação foi enviado para o seu e-mail.");
      navigation.navigate('SignUpCode', {username: email, code: ""});
    }
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <View style={styles.header}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Image source={marca} style={styles.mark} resizeMode="contain" />
          <Text style={styles.title}>Seja bem vindo!</Text>
          <Text style={styles.subtitle}>Cadastre-se, é simples e rápido!</Text>
        </View>

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
          <Text style={{fontSize: 14, textAlign: 'center', marginLeft: 25, marginRight: 25}} >
            *Ao clicar em "Registrar Usuário", você estará concordando com nossa Política de Uso e Privacidade.
          </Text>
        </View>

        <BtnSubmit onPress={() => navigation.navigate('SignUpCode')}>
          {
            loading ? (
              <View style={styles.indicator}>
                <ActivityIndicator size={"large"} color="#4DCE4D" />
              </View>
            ) : (
              <BtnTxt>Registrar Usuário</BtnTxt>
            )
          }
        </BtnSubmit>

        <Link onPress={() => navigation.navigate('SignIn')}>
          <LinkTxt>Já tenho uma Conta!</LinkTxt>
        </Link>

      </Container>
   </Background>
  );
}

const styles = StyleSheet.create({
  header:{
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10
  },
  logo:{
    width: 50, 
    height: 50
  },
  mark:{
    width: 150, 
    height: 50, 
    marginBottom: 15
  },
  title:{
    fontSize: 21, 
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 18
  },
  indicator:{
    flex:1, 
    position: 'absolute', 
    backgroundColor: '#000', 
    opacity: 0.7, 
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

