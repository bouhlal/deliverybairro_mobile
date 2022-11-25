import React from 'react';
import { Background, Container, Title } from './styles';
import { View } from 'react-native';

import Header from '../../components/Header';

  export default function Perfil() { 
    
  return (
    <Background>
      <Container>
        <Header/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Title>Perfil (Dados Usuário)</Title>
        </View>
      </Container>
    </Background>
  );
}