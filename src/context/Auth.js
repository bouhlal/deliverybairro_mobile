import React, { useState, useEffect, createContext } from 'react';
import { Auth, DataStore } from "aws-amplify";
import { Cliente } from "../models";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user_authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState(null);

  const sub = user_authorized?.attributes?.sub; 

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthorized);
  }, [])

  useEffect(() => {
    DataStore.query(Cliente, (cliente) => cliente.token_sms.eq(sub)).then((clientes) =>
      setUser(clientes[0])
    );
  }, [sub]);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error (signOut): ', error);
      setError(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, user_authorized, sub, setUser, signOut }}>
      { children }
    </AuthContext.Provider>
  );
};

//   return(
//     <AuthContext.Provider value={{ 
//       signed: !!user, user, error, loading,
//       signIn, signUp, signOut, confirmSignUp, resendConfirmationCode
//     }}>
//       { children }
//     </AuthContext.Provider> 
//   )
// }

/*
  import { Alert } from 'react-native';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function signIn(email, password) {
    setLoading(true);
    try {
      const user = await Auth.signIn({username: email, password: password});
      console.log("usuário logado: ", user); setUser(user);
    } catch (error) {
        console.log('Error (signIn): ', error);
        setError(error.message);
    }
    setLoading(false);
  };

  async function signUp( email, password ) {
    setLoading(true);
    try {
      const user = await Auth.signUp({ 
        username: email, 
        password: password,
        autoSignIn: {
          email: email,
        }
      });
      console.log("user signed up:", user);
      setUser(user);
    } catch (error) {
      console.error('Error (singUp): ', error);
      setError(error.message);
    }
    setLoading(false);
  }

  async function confirmSignUp(email, code) {
    try {
      await Auth.confirmSignUp(email, code, { forceAliasCreation: false });
    } catch (error) {
      console.log('Error (Confirming signUp): ', error);
      setError(error.message);
    }
  }

  async function resendConfirmationCode(email) {
      try {
        await Auth.resendSignUp(email);
        Alert.alert("Info","Código reenviado com sucesso!");
        console.log('code resent successfully');
      } catch (error) {
        console.log('Error (resending code): ', error);
        setError(error.message);
      }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error (signOut): ', error);
      setError(error.message);
    }
  }

**/