import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';
import { CartContext } from '../../context/Cart';

import logo from '../../../assets/logo.png';
import logomarca from '../../../assets/logomarca.png'
import sacola from '../../../assets/pedidos.png';

export default function Header(props) {

  Notifications.setNotificationHandler({
    handleNotification: async() => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge : true
    })
  })

  const navigation = useNavigation();

  const { cart } = useContext(CartContext);
  const { usr_token, GetTokenSMS, GetNotificationSMS } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    
    // avisa a aplicação que chegou uma nova notificação
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (new_notification) => {
        setNotification(new_notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response.notification.request.content.body)
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      GetNotificationSMS(notification);
      GoToLink('Pedidos');
  };
  }, [notification]);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Falha ao obter Token push para notificação push!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log('token gerado: ', token);
      setExpoPushToken(token); 
      GetTokenSMS(token);
    } else {
      alert('É necessário um dispositivo físico para notificações push');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4DCE4D',
      });
    }
  };

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
            console.log('token do usuário: ', expoPushToken);
            alert('DeliveryBairro App v1.0 Build #19 ' + '\n' + 'psi-software (31) 98410-7540 ' + '\n' + usr_token);
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

/*
  function ShowNotification(notification){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title}</Text>
          <Text>Body : {notification && notification.request.content.body}</Text>
          <Text>Data : {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button title="Meus Pedidos" onPress={()=>{GoToLink('Pedidos')}} />
      </View>
    ); 
  }

  async function ChangePermitions(){
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    let usr_token = await Notifications.getExpoPushTokenAsync()
    console.log('token registrado: ',usr_token);
    GetTokenSMS(usr_token);
  }

  async function registerForPushNotificationsAsync() {
    let usr_token;
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4DCE4D',
      });
    }
    if (Device.isDevice) {
      // const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      usr_token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('token registrado: ', usr_token);
      GetTokenSMS(usr_token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    return usr_token;
  }

  { notification &&
    alert(
      'You receive a new notification! '+
      notification.request.content.body+' '+
      JSON.stringify(notification.request.content.data)
    )
  }

*/


