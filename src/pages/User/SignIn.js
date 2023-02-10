import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Platform, ActivityIndicator } from 'react-native';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/logomarca.png';

export default function SignInCode() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const { signIn, loading } = useContext(AuthContext);

  function login() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={marca} style={styles.mark} resizeMode="contain" />

        <AreaInput>
          <Input
            placeholder='Email'
            autoCorrect={false}
            autoCapitalize='none'
            value={email}
            onChangeText={(text)=>setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder='Senha'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='numeric'
            value={password}
            onChangeText={(text)=>setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <BtnSubmit onPress={login}>
          {
            loading ? (
              <View style={styles.indicator}>
                <ActivityIndicator size={"large"} color="#000" />
              </View>
            ) : (
              <BtnTxt>Acessar</BtnTxt>
            )
          }
        </BtnSubmit>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkTxt>Ainda não possui Conta? Junte-se a Nós!</LinkTxt>
        </Link>

      </Container>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo:{
    width: 100, 
    height: 100
  },
  mark:{
    width: 300, 
    height: 100,
    marginBottom: 15
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
