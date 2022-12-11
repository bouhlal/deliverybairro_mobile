import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/Auth';
import { CartContext } from '../../context/Cart';
import { useNavigation } from '@react-navigation/native';

import CardItem from '../../components/Card';

import api from '../../services/api';

export default function Cesta() {
  const navigation = useNavigation();
  const { cart, info, subtotal, cleanCart, AddToCart, RemoveFromCart } = useContext(CartContext);
  const { user, token, GetTOKEN } = useContext(AuthContext);
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    let soma = parseFloat(subtotal) + parseFloat(info.taxa);
    setTotal(soma);
  }, [subtotal]);

  async function EnviarPedido() {

    if (token ==='' || !token) {
      alert('Erro! Verifique o Token de Usuário: ', token);
      GetTOKEN(user.token);
      alert('Token atualizado! '+'\\n'+token);
      return;
    }

    let json = {
      "id_conta": info.id,
      "id_cliente": user.id_cliente,
      "vr_subtotal": parseFloat(subtotal).toFixed(2),
      "vr_taxaentrega": parseFloat(info.taxa).toFixed(2),
      "vr_total": parseFloat(total).toFixed(2),
      "token": token,
      "itens": cart
    }
    console.log(json);
    await api.post('/pedidos/add', json)
    .then((response) => {
      console.log(response.data);
      alert('Pedido enviado com sucesso! #' + response.data.id_pedido);
      cleanCart();
      GoToLink('Pedidos');
    }).catch(error => {
      console.log('ERROR: ' + error);
    })
  }

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
        keyExtractor={(item)=>String(item.id_produto)}
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
