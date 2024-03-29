import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/Auth';

import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';

function Routes() {

  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return(
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator
          size='large'
          color='#FFF000'
        />
      </View>
    )
  }

  return(
    signed ? <AppRoutes/> : <AuthRoutes/> 
  )
}

export default Routes;
