import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { CartContext } from '../../context/Cart';

import Header from '../../components/Header';
import Product from '../../components/Product';
import noImage from '../../../assets/sem-imagem.jpg';
import api from '../../services/api';

export default function Produtos({ route }) {
  const { SetDelivery, AddToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);

  const [id_produto, setIdProduto] = useState(null);
  const [id_conta, setIdConta] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');

  const [qtd, setQtd] = useState(1);
  const [vr_total, setVrTotal] = useState(0);

  const [show, showModal] = useState(false);

  // Alert.alert("PARA TUDO!!! [Produtos]");

  useEffect(() => {
    loadProdutos();
    loadInfo();
  }, [route.params.id]);

  async function loadInfo() {
    await api.get(`/taxa/delivery/${route.params.id}`)
    .then((response) => {
      console.log(response.data);
      let info = {
        "id": route.params.id,
        "delivery": route.params.delivery,
        "horario": route.params.horario,
        "logo": route.params.logo,
        "taxa": response.data.vr_taxaentrega
      }
      SetDelivery(info);
      console.log(info);
    }).catch(error => {
      console.log('ERROR: ' + error);
    })
  }

  async function loadProdutos() {
    setLoading(true);
    await api.get(`/listar/produtos/delivery/${route.params.id}`)
    .then((response) => {
      updateProdutos(response.data);
      setLoading(false);
    }).catch(error => {
      console.log('ERROR: ' + error);
    })
    setLoading(false);
  }

  function updateProdutos(items) {
    setProdutos([]);
    items?.forEach((items) => {
      let data = {
        id_produto: items.id_produto,
        id_categoria: items.id_categoria,
        id_conta: items.id_conta,
        nome: items.nome,
        descricao: items.descricao,
        url_imagem: (items.url_imagem === null ? Image.resolveAssetSource(noImage).uri : items.url_imagem),
        vr_unitario: items.vr_unitario,
      };
      setProdutos(newArray => [...newArray, data]);
    });
  }

  function SelecionaItem(data) {
    setIdProduto(data.id_produto);
    setIdConta(data.id_conta);
    setNome(data.nome);
    setDescricao(data.descricao);
    setVrUnitario(data.vr_unitario);
    setUrlImagem(data.url_imagem);
    setQtd(1);
    setVrTotal(data.vr_unitario);
    showModal(true);
  }

  function add() {
    setQtd(qtd +1)
    setVrTotal((qtd +1) * vr_unitario);
  }

  function remove() {
    if (qtd>1) {
      setQtd(qtd -1);
      setVrTotal((qtd -1) * vr_unitario);
    }
  }

  function AddItem() {
    let newItem = {
      "id_produto": id_produto,
      "nome": nome,
      "descricao": descricao,
      "vr_unitario": vr_unitario,
      "url_imagem": url_imagem
    }
    AddToCart(newItem, qtd, vr_total);
    showModal(false);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
      >
        <View style={styles.shadow}>
          <View style={styles.modal}>
            <View style={styles.indicator} />

            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10, marginBottom: 10, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
              <Image style={{width: 150, height: 150, marginTop: 10}} source={{ uri: url_imagem }} />
              <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold'}}>{nome}</Text>
              <Text style={{color: '#000', fontSize: 21, fontWeight: 'bold', margin: 10}}>Total R$ {vr_total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
              <Text style={{color: '#000', fontSize: 18, fontStyle: 'italic', textAlign: 'center'}}>{descricao}</Text>
            </View>

            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

              <View style={{width: 150, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <TouchableOpacity onPress={()=>add()}>
                  <Ionicons name="ios-add-circle-outline" size={50} color="green" />
                </TouchableOpacity>

                <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold' }}>{qtd}</Text>

                <TouchableOpacity onPress={()=>remove()}>
                  <Ionicons name="md-remove-circle-outline" size={50} color="red"/>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btnAdd} onPress={()=>AddItem()}>
                <Text style={{color: '#FFF', fontSize: 18}}>Adiciona Pedido</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnClose} onPress={()=>showModal(false)}>
                <Text style={{color:'#fff' }}>FECHAR</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
      <Header />
      <View style={styles.container}>
        <Image source={{ uri: route.params.logo }} style={{ width: 150, height: 150 }} resizeMode="contain" />
        <Text style={styles.title}>{route.params.delivery}</Text>
        <FlatList
          data={produtos}
          keyExtractor={(item)=>String(item.id_produto)}
          ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há produtos deste Delivery!</Text>}
          renderItem={({item}) => <Product data={item} AddItemToCart={()=>SelecionaItem(item)} />}
        />
      </View>a
      { 
        loading && 
        <View style={{flex:1, position: 'absolute', backgroundColor: '#000', opacity: 0.7, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={50} color='#4DCE4D' />
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  header: {
    height: 120,
    padding: 10
  },
  title:{
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray', 
  },
  shadow:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute'
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '70%',
    backgroundColor: '#FFF',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
  },
  btnAdd: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#145E7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  btnClose: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  flatlist: {
    flex: 1,
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },

});
