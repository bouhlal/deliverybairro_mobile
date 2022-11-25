import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import noImage from '../../../assets/sem-imagem.jpg';
import api from '../../services/api';

export default function Home({ route }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [deliverys, setDeliverys] = useState([]);

  useEffect(() => {
    loadDeliverys();
  }, [route.params.id]);

  async function loadDeliverys() {
    setLoading(true);
    try {
      const response = await api.get(`/listar/deliverys/categoria/${route.params.id}`);
      console.log(response.data);
      updateDeliverys(response.data);
      setLoading(false);
    } catch(error) {
        console.log(error)
    }
    setLoading(false);
  }

  function updateDeliverys(items) {
    setDeliverys([]);
    items?.forEach((items) => {
      let data = {
        id_conta: items.id_conta,
        id_categoria: items.id_categoria,
        delivery: items.delivery,
        logomarca: (items.logomarca === null ? Image.resolveAssetSource(noImage).uri : items.logomarca),
        marcador: items.marcador,
        horario: items.horario,
      };
      setDeliverys(newArray => [...newArray, data]);
    });
  }

  function LinkTo(page, p) {
    navigation.navigate(page, p);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>{route.params.categoria}</Text>
        <FlatList
          data={deliverys}
          keyExtractor={(item)=>String(item.id_delivery)}
          ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há estabelecimentos cadastrados nesta categoria.</Text>}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity onPress={() => LinkTo('Produtos', { id: item.id_conta, delivery: item.delivery, horario: item.horario, logo: item.logomarca })}>
                <View style={styles.card}>
                  <Image style={styles.imagem} source={{ uri: item.logomarca }} />
                  <View style={{flexDirection: 'column', width: '100%'}}>
                    <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{item.delivery}</Text>
                    <Text style={{ fontSize: 13}}>{item.horario}</Text>
                    <Text>Link no mapa   <Fontisto color="#FF0000" name='map-marker-alt' size={28}/></Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
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
    height: 120,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  label:{
    fontSize: 21,
    fontWeight: 'bold'
  },
  imagem:{
    width: 100, 
    height: 100, 
    margin: 5
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  }
})
