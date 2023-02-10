import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../context/Auth';

import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';

function Routes() {

  const { signed, loading } = useContext(AuthContext);

  if (signed) {
    return(
      <View style={styles.container}>
        {loading &&
          <View style={styles.indicator}>
            <ActivityIndicator size={"large"} color="#4DCE4D" />
          </View>
        }
      </View>
    )
  }

  return(
    signed ? <AppRoutes/> : <AuthRoutes/> 
  )
}

export default Routes;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
