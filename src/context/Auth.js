import React, { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';
import { Auth } from "aws-amplify";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user_authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthorized);
  }, [])

  async function signIn(email, password) {
    setLoading(true);
    try {
      const login = await Auth.signIn({username: email, password: password});
      setAuthorized(login); setUser(user);
      console.log("usuário logado: ", user, user_authorized.username);
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
      signed: !!user_authorized, user, loading,
      signIn, signUp, confirmSignUp, resendConfirmationCode, signOut
    }}>
      { children }
    </AuthContext.Provider> 
  )
}
