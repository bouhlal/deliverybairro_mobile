import { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, Modal, SafeAreaView, ActivityIndicator } from "react-native";
import { CartContext } from "../../context/Cart";
import { DataStore } from "aws-amplify";
import { Delivery, Produto } from "../../models";

import Header from "../../components/Header";

export default function Delivery({ route }) {
  const { SetDelivery, AddToCart } = useContext(CartContext);
  const [delivery, setDelivery] = useState(null);
  const [listadeprodutos, setListaDeProdutos] = useState([]);
  const [produto, setProduto] = useState({});

  const [qtd, setQtd] = useState(1);
  const [subtotal, setSubTotal] = useState(0);
  const [show, showModal] = useState(false);

  const DEFAULT_IMAGE = "https://deliverybairro-storage-25990171215340-staging.s3.amazonaws.com/images/sem-imagem.png";

  console.warn('Delivery ID: ', route.params?.id);

  useEffect(() => {
    DataStore.query(Delivery, route.params?.id).then(setDelivery);
    DataStore.query(Produto, (produto) => produto.deliveryID.eq(route.params?.id)).then(setListaDeProdutos);
    let info = {
      "id": delivery.id,
      "delivery": delivery.nome,
      "horario": delivery.horario,
      "logo": delivery.url_imagem,
      "taxa": delivery.taxa_entrega
    }
    SetDelivery(info);
  }, [route.params?.id]);

  if (!delivery) {
    return <ActivityIndicator size={"large"} color="#145E7D" />
  }

  async function SelectItem(item) {
    setProduto(item); 
    showModal(true);
  }

  function add() {
    setQtd(qtd +1)
    setSubTotal((qtd +1) * produto.vr_unitario);
  }

  function remove() {
    if (qtd>1) {
      setQtd(qtd -1);
      setSubTotal((qtd -1) * produto.vr_unitario);
    }
  }

  function AddItemToCart(item) {
    AddToCart(item, qtd, subtotal);
    showModal(false);
  }

  function DeliveryHeader({ delivery }) {
    return (
      <View style={styles.page}>
        <Image
          source={{ uri: !delivery.image ? DEFAULT_IMAGE : delivery.image }} 
          style={styles.image} 
        />
        <View style={styles.container}>
          <Text style={styles.title}>{delivery.name}</Text>
          <Text style={styles.subtitle}>Valor da Taxa de Entrega: R$ {delivery.taxa_entrega.toFixed(2)}</Text>
          <Text style={styles.subtitle}>Tempo Estimado: {delivery.minDeliveryTime} a {delivery.maxDeliveryTime} min.</Text>
          <Text style={styles.menuTitle}>CARDÁPIO</Text>
        </View>
      </View>
    );
  };

  function DeliveryItemToSelect(item) {
    return (
      <View style={styles.shadow}>
        <View style={styles.modal}>
    
          <View style={styles.indicator} />
          <View 
            style={{
              flexDirection: 'column', 
              justifyContent: 'center', alignItems: 'center', 
              padding: 10, marginBottom: 10, 
              borderBottomColor: 'lightgray', borderBottomWidth: 1 
            }}
          >
            <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold'}}>{item.nome}</Text>
            <Image style={{width: 150, height: 150, marginTop: 10}} source={{ uri: item.url_imagem }} />
            <Text style={{color: '#000', fontSize: 21, fontWeight: 'bold', margin: 10}}>{qtd} x R$ {item.vr_unitario.toFixed(2)} = R$ {subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
            <Text style={{color: 'grey', fontSize: 18, fontStyle: 'italic', textAlign: 'center'}}>{item.descricao}</Text>
          </View>
    
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 150, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
              <TouchableOpacity onPress={()=>add()}>
                <Ionicons name="ios-add-circle-outline" size={50} color="green" />
              </TouchableOpacity>
              <Text style={{ color: '#000', fontSize: 28, fontWeight: 'bold' }}>{qtd}</Text>
              <TouchableOpacity onPress={()=>remove()}>
                <Ionicons name="md-remove-circle-outline" size={50} color="red"/>
              </TouchableOpacity>
            </View>
    
            <TouchableOpacity style={styles.btnAdd} onPress={()=>AddItemToCart()}>
              <Text style={{ color: '#FFF', fontSize: 18 }}>Adiciona Item ao Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnClose} onPress={()=>close()}>
              <Text style={{ color: '#FFF', fontSize: 18 }}>FECHAR</Text>
            </TouchableOpacity>
          </View>
    
        </View>
      </View>
  
    )
  }

  function DeliveryListItem({ item, selectItem }) {
    return (
      <TouchableOpacity onPress={selectItem} style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.nome}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.price}>R$ {(item.vr_unitario > 0) ? item.vr_unitario.toFixed(2) : "0,00"}</Text>
        </View>
        {dish.image && (
          <Image style={styles.image} source={{ uri: item.url_imagem }} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={show} >
        <DeliveryItemToSelect item={produto} fechar={()=>showModal(false)}/>
      </Modal>
      <Header />
      <FlatList
        data={listadeprodutos}
        ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há produtos deste Delivery!</Text>}
        ListHeaderComponent={() => <DeliveryHeader delivery={delivery} />}
        keyExtractor={(produto) => produto.id}
        renderItem={({produto}) => <DeliveryListItem item={produto} selectItem={()=>SelectItem(produto)}/>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    padding: 10
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },
  flatlist: {
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    margin: 10,
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  }
});

    // if (item.id) {
    //   DataStore.query(Dish, item.id).then(setDish);
    //   console.log('Delivery: ', delivery.name);
    //   console.log("Dish: ", dish);
    //   showModal(true);
    // }

    {/* 
      { basket && (
        <TouchableOpacity onPress={() => navigation.navigate("Cesta de Compras")} style={styles.button}>
          <Text style={styles.buttonText}>
            Cesta de Compras ({ basketDishes.length })
          </Text>
        </TouchableOpacity>
      )} 
    */}

  {/* 
    <TouchableOpacity onPress={() => LinkTo('Produtos', { id: delivery.id, nome: delivery.nome, horario: delivery.horario, imagem: delivery.url_imagem })}></TouchableOpacity> 
  */}
