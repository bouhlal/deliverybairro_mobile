import React, { useContext } from 'react';
import { Background, Container } from './styles';
// import { ClienteCreateForm, ClienteUpdateForm } from './ui-components';
import { ClienteCreateForm, ClienteUpdateForm } from '@aws-amplify/ui-react';
import { AuthContext } from '../../context/Auth';

import Header from '../../components/Header';

export default function Perfil() { 
  const { user } = useContext(AuthContext);

  return (
    <Background>
      <Container>
        <Header/>
        { user ?
          (
            <ClienteUpdateForm />
          ) : (
            <ClienteCreateForm />
          )
        } 
      </Container>
    </Background>
  );
}

/*
  import { View, Alert } from 'react-native';
  // Alert.alert("PARA TUDO!!! [Perfil]");
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Title>Perfil (Dados Usuário)</Title>
  </View>
  <ClienteUpdateForm
    Cliente = {/an existing %data model% record/}
  />
**/