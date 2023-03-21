import React, { useState, useContext } from 'react';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { View, Image, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/logomarca.png';

export default function SignIn() {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const { signIn, loading } = useContext(AuthContext);

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <Image source={logo} style={{ width: 100, height: 100 }} resizeMode="contain" />
        <Image source={marca} style={{ width: 300, height: 100 }} resizeMode="contain" />

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

        <BtnSubmit onPress={() => signIn(email, password)}>
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
                <ActivityIndicator size='large' color='#FFB901' />
              </View>
            ) : (
              <BtnTxt>Acessar</BtnTxt>
            )
          }
        </BtnSubmit>

        <Link onPress={() => navigation.navigate('SignUp1')}>
          <LinkTxt>Ainda não possui Conta? Junte-se a Nós!</LinkTxt>
        </Link>

      </Container>
    </Background>
  );
}
