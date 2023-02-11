import React, { useContext } from 'react';
import AppRoutes from './App.Routes';

export default function Routes() {
  return(
    <AppRoutes />
  )
}

/*
  import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
  import { AuthContext } from '../context/Auth';
 
  import AuthRoutes from './Auth.Routes';

  const { user } = useContext(AuthContext);
  const { signed, loading } = useContext(AuthContext);

  console.log('User:', user);

  user ? <AppRoutes/> : <AuthRoutes/> 

  // Alert.alert(`STOP!!! [SignIn] (${signed}) `); 

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

**/