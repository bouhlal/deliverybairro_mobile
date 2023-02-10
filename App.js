import 'react-native-gesture-handler';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

import AuthProvider from './src/context/Auth';
import CartProvider from './src/context/Cart';

import Routes from './src/routes';

import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";

Amplify.configure({
  ...config, 
  Analytics: {
    disabled: true
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <StatusBar backgroundColor='#FFF' barStyle='dark-content' />
          <Routes/>
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

// import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
// import OrderProvider from "./src/context/Order"
// function App() {
// export default withAuthenticator(App);