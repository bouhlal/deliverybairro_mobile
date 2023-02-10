import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Platform, ActivityIndicator } from 'react-native';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/logomarca.png';

export default function SignUpCode({ route }) {
  const navigation = useNavigation();
  
  const [username, setUsername] = useState(route.params?.username);
  const [code, setCode] = useState('');  

  const { confirmSignUp, resendConfirmationCode, loading } = useContext(AuthContext);
  
  function SendCode() {
    confirmSignUp(username, code);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={marca} style={styles.mark} resizeMode="contain" />

        <AreaInput>
          <Input
            placeholder='------'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='numeric'
            value={code}
            onChangeText={(text)=>setCode(text)}
          />
        </AreaInput>

        <BtnSubmit onPress={SendCode}>
          {
            loading ? (
              <View style={styles.indicator}>
                <ActivityIndicator size={"large"} color="#000" />
              </View>
            ) : (
              <BtnTxt>ENVIAR CÓDIGO</BtnTxt>
            )
          }
        </BtnSubmit>

        <Link onPress={() => resendConfirmationCode}>
          <LinkTxt>Reenviar Código de Confirmação?</LinkTxt>
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
