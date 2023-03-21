import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, RefreshControl, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/Auth';

import Header from '../../components/Header';
import api from '../../services/api';

export default function Pedidos() {
  const { user, notify } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  const flatlist = React.useRef(null);

  useEffect(() => {
    loadPedidos();
  }, [notify]);

  async function loadPedidos() {
    let id = user.id_cliente;
    await api.get(`/listar/pedidos/cliente/${id}`)
    .then((snapshot) => {
      setPedidos([]);
      snapshot?.data.forEach((items)=>{
        let data = {
          "id_pedido": items.id_pedido,
          "dt_pedido": items.dt_pedido,
          "vr_total": parseFloat(items.vr_total).toFixed(2),
          "qtd_item": items.qtd_item,
          "status": items.status
        }
        setPedidos(newArray => [...newArray, data])
      })
    }).catch(error => {
      console.log('ERROR: ' + error);
    });
  }

  function myListEmpty(){
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>Lista de Pedidos vazia.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />
        <FlatList
          ref={flatlist}
          refreshControl={ <RefreshControl onRefresh={()=>{loadPedidos()}} refreshing={loading} /> }
          data={pedidos}
          showsVerticalScrollIndicator={true}
          onContentSizeChange={()=>{ flatlist.current.scrollToEnd() }}
          ListEmptyComponent={myListEmpty}
          ListHeaderComponent={() => (
            <View style={{ fontSize: 30, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.title}>MEUS PEDIDOS</Text>
              <Text style={{ color: '#000', fontSize: 21, marginLeft: 10, fontWeight: 'bold'}}>{user.nome} {user.sobrenome}</Text>
              <Text style={{ color: '#000', fontSize: 14, marginLeft: 10, marginBottom: 10 }}>Cliente ID #{user.id_cliente}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id_pedido}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>PEDIDO #{item.id_pedido} EM {item.dt_pedido}</Text>
              <Text style={styles.descricao}>{item.qtd_item} itens = R$ {item.vr_total}</Text>
              { item.status === "A" ? <Text style={[styles.status, {backgroundColor: 'red'}]}>AGUARDANDO</Text> : null }
              { item.status === "P" ? <Text style={[styles.status, {backgroundColor: 'green'}]}>EM PRODUÇÃO</Text> : null }
              { item.status === "E" ? <Text style={[styles.status, {backgroundColor: 'blue'}]}>SAIU P/ ENTREGA</Text> : null }
              { item.status === "F" ? <Text style={[styles.status, {backgroundColor: 'black'}]}>FINALIZADO</Text> : null }
              { item.status === "C" ? <Text style={[styles.status, {backgroundColor: 'grey'}]}>CANCELADO</Text> : null }
            </View>
          )}
        />
      </View>
      { 
        loading && 
        <View style={styles.loading}>
          <ActivityIndicator size={50} color='#4DCE4D' />
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
  },
  title:{
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1
  },
  card:{
    flex: 1,
    height: 85,
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    padding: 5
  },
  label:{
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  descricao:{
    fontSize: 14,
    marginLeft: 5
  },
  status:{
    color: '#FFF',
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 5,
    padding: 3
  },
  loading:{
    flex: 1, 
    position: 'absolute', 
    backgroundColor: '#000', 
    opacity: 0.7, 
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})