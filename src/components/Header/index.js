import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../context/Cart';

import logo from '../../../assets/logo.png';
import logomarca from '../../../assets/logomarca.png'
import sacola from '../../../assets/pedidos.png';

export default function Header(props) {
  const navigation = useNavigation();
  const { cart } = useContext(CartContext);

  function GoToLink(link) {
    return (
      navigation.navigate(link)
    )
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={()=> {
            alert("DeliveryBairro App v1.0 Build #21 " + '\n' + "psi-software (31) 98410-7540");
          }}
        >
          <Image source={logo} style={{ width: 85, height: 85 }} resizeMode="contain" />
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={logomarca} style={{ width: 195, height: 85 }} resizeMode="contain" />
        </View>

        <TouchableOpacity onPress={()=>GoToLink('Cesta')}>
          <Image source={sacola} style={{ width: 85, height: 85 }} resizeMode="contain" />
          { cart.length >= 1 &&
            <View style={styles.dot}>
              <Text style={styles.dotText}>{ cart?.length }</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height: 100,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  dot:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 30,
    height: 30, 
    borderRadius: 15,
    position: 'absolute',
    zIndex: 99,
    bottom: -4,
    left: -6
  },
  dotText:{
    fontSize: 14,
    color: '#FFF'
  }
})
