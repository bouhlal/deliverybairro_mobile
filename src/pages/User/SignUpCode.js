import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, Platform, ActivityIndicator, Alert } from 'react-native';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/logomarca.png';

export default function SignUpCode({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(route.params?.email);
  const [code, setCode] = useState('');  

  const { error, loading, confirmSignUp, resendConfirmationCode } = useContext(AuthContext);

  /* Alert.alert("PARA TUDO!!! [SignUpCode]"); **/

  function SendCode() {
    confirmSignUp(email, code);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={marca} style={styles.mark} resizeMode="contain" />

        <AreaInput>
          <Text>Informe o código de confirmação:</Text>
          <Input
            value={code}
            placeholder='------'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText={(text)=>setCode(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={false}
          />
        </AreaInput>

        <BtnSubmit onPress={()=>SendCode()}>
          {
            loading ? (
              <View style={styles.indicator}>
                <ActivityIndicator size={"large"} color="#FF0000" />
              </View>
            ) : (
              <BtnTxt>CONFIRMAR CÓDIGO</BtnTxt>
            )
          }
        </BtnSubmit>

        {error && 
          <Text>{error}</Text>
        }

        <Link onPress={() => resendConfirmationCode}>
          <LinkTxt>Reenviar Código?</LinkTxt>
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
