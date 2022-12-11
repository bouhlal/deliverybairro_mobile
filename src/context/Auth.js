import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import firebase from '../services/config';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [usr_token, setUsrToken] = useState('');
  const [notify, setNotify] = useState('');

  function GetTOKEN(token) {
    // let data = {
    //   uid: user.uid,
    //   email: user.email,
    //   id_cliente: user.id_cliente,
    //   nome: user.nome,
    //   sobrenome: user.sobrenome,
    //   token: usr_token
    // }
    // console.log(data);
    // setUser(data);
    // storageUser(data);
    setUsrToken(token);
  }

  function GetNOTIFICATION(notification) {
    setNotify(notification);
  }

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');
      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }
    loadStorage();
  }, []);

  // Logar o Usuário

  async function signIn(email, password) {
    setLoading(true);
    console.log(email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async(value) => {
      await firebase.database().ref('users').child(value.user.uid).once('value')
      .then((snapshot) => {
        let data = {
          uid: value.user.uid,
          email: value.user.email,
          id_cliente: snapshot.val().id_cliente,
          nome: snapshot.val().nome,
          sobrenome: snapshot.val().sobrenome,
          token: snapshot.val().token
        }
        // console.log(data);
        storageUser(data);
        setUser(data);
      })
    }).catch((error) => {
      alert('Error: '+error.code);
    })
    setLoading(false);
  }

  // Cadastrar Usuário

  async function signUp(nome, sobrenome, endereco, complemento, bairro, cidade, UF, CEP, telefone, email, password) {
    setLoading(true);
    const json = {
      "id_cliente": null, 
      "nome": nome, "sobrenome": sobrenome,
      "endereco": endereco, "complemento": complemento, "bairro": bairro, "cidade": cidade, "uf": UF, "cep": CEP,
      "telefone": telefone, "email": email, 
      "cnpj": "", "cpf": "", "token": token
    }
    await api.post('/cliente/add/', json).then(response => {
      console.log(response);
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
          let uid = value.user.uid;
          await firebase.database().ref('users').child(uid).set({
            nome: json.nome,
            sobrenome: json.sobrenome,
            id_cliente: response.val().id_cliente,
            token: response.val().token
          }).then((snapshot) => {
            let data = {
              uid: value.user.uid,
              email: value.user.email,
              id_cliente: snapshot.val().id_cliente,
              nome: snapshot.val().nome,
              sobrenome: snapshot.val().sobrenome,
              token: snapshot.val().token
            };
            setUser(data);
            storageUser(data);
            console.log(data);
          }).catch((error) => {
            console.log('ERROR: ' + error);
          })
      }).catch(error => {
        console.log('ERROR: ' + error);
      })
    });

    setLoading(false);
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  // Deslogar Usuário

  async function signOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  return(
    <AuthContext.Provider value={{ 
      signed: !!user, user, loading, usr_token, notify,
      signIn, signUp, signOut, GetTOKEN, GetNOTIFICATION
    }}>
      { children }
    </AuthContext.Provider> 
  )
}

export default AuthProvider;