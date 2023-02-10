import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, RefreshControl, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/Auth';

import { DataStore } from "aws-amplify";
import { Pedido, Item } from "../../models";


import Header from '../../components/Header';

export default function Pedidos({ route }) {
  const { user, loading } = useContext(AuthContext);
  const [ pedidos, setPedidos ] = useState([]);

  const flatlist = React.useRef(null);

  useEffect(() => {
    DataStore.query(Pedido, (pedido) => pedido.userID.eq(user.id)).then(setPedidos);
  }, [user.id]);

  function myListEmpty(){
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>Lista de Pedidos vazia.</Text>
      </View>
    );
  };

  if (!pedidos) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color="#4DCE4D" />
      </View>
    )
  }

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
              <Text style={{ color: '#000', fontSize: 14, marginLeft: 10, marginBottom: 10 }}>Cliente ID #{user.id}</Text>
            </View>
          )}
          keyExtractor={(pedido) => pedido.id}
          renderItem={({ pedido }) => (
            <View style={styles.card}>
              <Text style={styles.label}>PEDIDO #{pedido.id} EM {pedido.dt_pedido}</Text>
              <Text style={styles.descricao}>{pedido.Items.length} itens = R$ {pedido.vr_total.toFixed(2)}</Text>
              { pedido.status === Status.NOVO ? <Text style={[styles.status, {backgroundColor: 'red'}]}>NOVO</Text> : null }
              { pedido.status === Status.AGUARDANDO ? <Text style={[styles.status, {backgroundColor: 'orange'}]}>AGUARDANDO</Text> : null }
              { pedido.status === Status.PREPARANDO ? <Text style={[styles.status, {backgroundColor: 'green'}]}>PREPARANDO</Text> : null }
              { pedido.status === Status.PRONTO_PARA_ENTREGA ? <Text style={[styles.status, {backgroundColor: 'pink'}]}>PRONTO P/ RETIRADA</Text> : null }
              { pedido.status === Status.RETIRADO ? <Text style={[styles.status, {backgroundColor: 'violet'}]}>RETIRADO</Text> : null }
              { pedido.status === Status.ENTREGUE ? <Text style={[styles.status, {backgroundColor: 'blue'}]}>ENTREGUE</Text> : null }
              { pedido.status === Status.FINALIZADO ? <Text style={[styles.status, {backgroundColor: 'black'}]}>FINALIZADO</Text> : null }
              { pedido.status === Status.CANCELADO ? <Text style={[styles.status, {backgroundColor: 'grey'}]}>CANCELADO</Text> : null }
            </View>
          )}
        />
      </View>
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
  indicator:{
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