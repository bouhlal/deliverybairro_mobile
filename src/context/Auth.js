import React, { useState, createContext } from 'react';
import { Alert } from 'react-native';
import { Auth, Hub } from "aws-amplify";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState(null);
  // const [user_authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState(null);

  // const token_sms = user?.attributes?.token_sms; 
  // console.warn("token_sms: ", token_sms);

  function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
          const user = payload.data;
          // assign user
      } else if (event === 'autoSignIn_failure') {
          // redirect to sign in page
      }
    })
  }
  
  async function signIn(email, password) {
    setLoading(true);
    try {
      const user_login = await Auth.signIn({username: email, password: password});
      setUser(user_login);
      console.log("usuário logado: ", user);
    } catch (error) {
        console.log('Error (signIn): ', error);
    }
    setLoading(false);
  }

  async function signUp( email, password ) {
    setLoading(true);
    try {
      const { user } = await Auth.signUp({ 
        username: email, 
        password: password,
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      }).then(setUser(user));
      console.log("user:", user)
    } catch (error) {
      console.error('Error (singUp): ', error);
    }
    setLoading(false);
  }

  async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
    } catch (error) {
      console.log('Error (Confirming signUp): ', error);
    }
  }

  async function resendConfirmationCode() {
      try {
        await Auth.resendSignUp(username);
        Alert.alert("Info","Código reenviado com sucesso!");
        console.log('code resent successfully');
      } catch (error) {
        console.log('Error (resending code): ', error);
      }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error (signOut): ', error);
    } 
  }

  return(
    <AuthContext.Provider value={{ 
      signed: !!user, user, loading, cliente, //token_sms, 
      signIn, signUp, confirmSignUp, resendConfirmationCode, listenToAutoSignInEvent, signOut
    }}>
      { children }
    </AuthContext.Provider> 
  )
}

  // import { DataStore } from "aws-amplify";
  // import { Cliente } from "../models";

  // await DataStore.save(new Cliente({
  //   "nome": "", 
  //   "sobrenome": "", 
  //   "telefone": "", 
  //   "email": email,
  //   "endereco": {}, 
  //   "uf": "UF.MG", 
  //   "marcador": {},
  //   "cpf": "", 
  //   "cnpj": "", 
  //   "url_foto": "https://deliverybairro-storage-25990171215340-staging.s3.amazonaws.com/images/sem-imagem.png",
  //   "Baskets": [], 
  //   "Pedidos": [],
  //   "token_sms": ""
  // }).then(setCliente));

  // console.log("cliente: ", cliente);

  // useEffect(() => {
  //   Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthorized);
  // }, [])

  // useEffect(() => {
  //   DataStore.query(Cliente, (cliente) => cliente.token_sms.eq(token_sms)).then((clientes) =>
  //     setUser(clientes[0])
  //   );
  // }, [token_sms]);
