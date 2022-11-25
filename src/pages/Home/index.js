import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import noImage from '../../../assets/sem-imagem.jpg';
import api from '../../services/api';

export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    loadCategorias();
  }, []);

  async function loadCategorias() {
    setLoading(true);
    await api.get('/listar/categorias')
    .then((response) => {
      updateCategorias(response.data);
      setLoading(false);
    }).catch(error => {
      console.log('ERROR: ' + error);
    })
    setLoading(false);
  }

  function updateCategorias(items) {
    setCategorias([]);
    items?.forEach((items) => {
      let data = {
        id_categoria: items.id_categoria,
        descricao: items.descricao,
        url_imagem: (items.url_imagem === null ? Image.resolveAssetSource(noImage).uri : items.url_imagem),
        ordem: items.ordem,
      };
      setCategorias(newArray => [...newArray, data]);
    });
  }

  function LinkTo(page, p) {
    navigation.navigate(page, p);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>CATEGORIAS</Text>
        <FlatList
          data={categorias}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item) => String(item.id_categoria)}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity onPress={()=>LinkTo('Deliverys', { id: item.id_categoria, categoria: item.descricao })}>
                <View style={styles.card}>
                  <Image source={{ uri: item.url_imagem }} style={styles.imagem} />
                  <Text style={styles.label}>{item.descricao}</Text>
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
    height: 115,
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
  }
})
