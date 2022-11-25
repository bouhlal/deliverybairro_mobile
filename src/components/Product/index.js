import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Product({ data, AddItemToCart }) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={AddItemToCart} style={styles.product}>
          <Image style={styles.imagem} source={{ uri: data.url_imagem }} />
          <View style={styles.descricao}>
            <Text style={{ fontWeight: 'bold' }}>{data.nome}</Text>
            <Text style={{ width: '65%', fontSize: 10, fontStyle: 'italic', textAlign: 'left'}}>{data.descricao} </Text>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>R$ {data.vr_unitario.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray', 
    padding: 10,
  },
  product:{
    flexDirection: 'row', 
  },
  btnAdd:{
    justifyContent: 'flex-end',
  },
  imagem:{
    width: 75, 
    height: 75,
  },
  descricao: { 
    flexDirection: 'column', 
    marginLeft: 10
  }
})