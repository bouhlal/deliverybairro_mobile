import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { FontAwesome5, Fontisto, Entypo } from '@expo/vector-icons';

import Home from '../pages/Home';
import Deliverys from '../pages/Deliverys';
import Produtos from '../pages/Produtos';
import Pedidos from '../pages/Pedidos';
import MyCart from '../pages/MyCart';
import Perfil from '../pages/Perfil';

import SideBar from '../components/SideBar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function AppRoutes() {

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 65 },
          fontWeight: 'bold',
          headerShown: false,
        }}

      >
        <Tab.Screen
          name='Home'
          component={ Home }
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return <Entypo name='shop' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
            }
          }}
        />
        <Tab.Screen
          name='Pedidos'
          component={ Pedidos }
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return <Fontisto name='shopping-bag-1' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
            }
          }}
        />
        <Tab.Screen
          name='Perfil'
          component={ Perfil }
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return <FontAwesome5 name='user-cog' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
            }
          }}
        />

      </Tab.Navigator>
    );
  }

  function DrawerNavigator() {

    const getHeaderTitle = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
      switch (routeName) {
        case 'Home': return 'Categorias (Home)';
        case 'Deliverys': return 'Deliverys (Perto de Você)'
        case 'MyCart': return 'Carrinho de Compras';
        case 'Perfil': return 'Perfil (Usuário)';
      }
    };

    return (
      <Drawer.Navigator
        drawerContent={(props) => <SideBar {...props} />}
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            backgroundColor: '#FFF',
            width: '70%',
            marginTop: 5,
            marginBotton: 5,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
          },
          drawerLabelStyle: {
            fontWeight: 'bold'
          },
          drawerItemStyle: {
            activeTintColor: '#FFF',
            activeBackgroundColor: '#FF0000',
            inactiveTintColor: '#5D5D5D',
            inactiveBackgroundColor: '#000',
            marginVertical: 5
          },
        }}
      >
        <Drawer.Screen
          name="Delivery Bairro"
          component={TabNavigator}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#000',
              borderBottomWidth: 0,
            },
            tabBarIcon: {
              color: '#000'
            }
          })}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
      />

      <Stack.Screen
        name="Home"
        component={ Home }
        options={() => ({
          headerShown: true,
          headerTitle: 'Categorias de Produtos',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

      <Stack.Screen
        name="Deliverys"
        component={ Deliverys }
        options={() => ({
          headerShown: true,
          headerTitle: 'Deliverys por Categoria',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

      <Stack.Screen
        name="Produtos"
        component={ Produtos }
        options={() => ({
          headerShown: true,
          headerTitle: 'Produtos por Delivery',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

      <Stack.Screen
        name="MyCart"
        component={ MyCart }
        options={() => ({
          headerShown: true,
          headerTitle: 'Carrinho de Compras',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
        })}
      />

    </Stack.Navigator>
  );
}

/**
 * tabela de cores: #FFB901 #55A9D6 #7F7B7B #5D5D5D #FF0000 #0033CC #FFF000 #131313 #4DCE4D
 */
