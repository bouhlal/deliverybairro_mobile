import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';
import { CartContext } from '../../context/Cart';

import { DataStore } from "aws-amplify";
import { Pedido, Item } from "../../models";

import CardItem from '../../components/Card';

export default function Cart() {
  const navigation = useNavigation();
  const { cart, delivery, basket, basketItens, subtotal, setDelivery, cleanCart, AddToCart, RemoveFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [ courier, setCourier] = useState(null); 
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    let soma = parseFloat(subtotal) + parseFloat(delivery.taxa);
    setTotal(soma);
  }, [subtotal]);

  async function EnviarPedido() {

    await DataStore.save(
      new Pedido({
        "dt_pedido": new Date(),
        "vr_subtotal": parseFloat(subtotal).toFixed(2),
        "vr_taxaentrega": parseFloat(delivery.taxa).toFixed(2),
        "vr_total": parseFloat(total).toFixed(2),
        "status": Status.NOVO,
        "token_sms": "",
        "clienteID": user.id,
        "Items": cart,
        "Delivery": delivery, /* Provide a Delivery instance here */
        "Courier": courier /* Provide a Courier instance here */
      })
    ).then((pedido) => {
      alert('Pedido enviado com sucesso! #' + pedido.id);
      console.log(pedido);
      cleanCart();
      GoToLink('Pedidos');
    }).catch(error => {
      console.log('ERROR: ' + error);
    })
  }

  // function EnviarPedido() {
  //   Alert.alert("Envia pedido para o Delivery...")
  // }

  function CancelarPedido() {
    cleanCart();
    GoToLink('Pedidos');
  }

  function GoToLink(link) {
    return (
      navigation.navigate(link)
    )
  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>
        <Image style={styles.imagem} source={{ uri: info.logo }} />
        <View style={{flexDirection: 'column', width: '100%'}}>
          <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{info.delivery}</Text>
          <Text style={{ fontSize: 13}}>{info.horario}</Text>
        </View>
      </View>

      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=>String(item.id)}
        ListEmptyComponent={() => <Text style={styles.empty}>Carrinho de Compras vazio!</Text>}
        renderItem={({item})=>(
          <CardItem
            data={item}
            AddQtd={() => AddToCart(item, 1, item.vr_unitario)}
            RemoveQtd={() => RemoveFromCart(item)}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.subtotal}>Sub-Total: R$ {parseFloat(subtotal).toFixed(2)}</Text>
            <Text style={styles.taxa}>Taxa de Entrega: R$ {parseFloat(info.taxa).toFixed(2)}</Text>
            <Text style={styles.total}>Total: R$ {parseFloat(total).toFixed(2)}</Text>
            <Text>ID da notificação: {notificationId}</Text>
          </View>
        )}
      />

      {
        (cart.length > 0) &&
        <TouchableOpacity style={styles.btnAdd} onPress={()=>EnviarPedido()}>
          <Text style={{color: '#FFF', fontSize: 18}}>Enviar Pedido</Text>
        </TouchableOpacity>
      }
        <TouchableOpacity style={styles.btnCancel} onPress={()=>CancelarPedido()}>
          <Text style={{color: '#FFF', fontSize: 18}}>Cancelar Pedido</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },
  subtotal:{
    fontSize: 18,
    marginTop: 20
  }, 
  taxa:{
    fontSize: 18,
  },
  total:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnAdd: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#145E7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnCancel: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  imagem:{
    width: 75, 
    height: 75,
  },
})
