import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

import AuthProvider from './src/context/Auth';
import CartProvider from './src/context/Cart';
import Routes from './src/routes';

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