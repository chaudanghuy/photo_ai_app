import React from "react";
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import Device from '../screens/Devices';
import Revenue from '../screens/Revenue';
import Order from "../screens/Order";
import Account from '../screens/Account';
import Login from "../screens/Login";
import { useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainComponent = () => {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      {currentUser ? (
        <Tab.Navigator>
          <Stack.Screen name="Homepage"
            component={HomePage}
            options={{
              title: 'Homepage',
              headerStyle: styles.banner,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              tabBarIcon: (props) => (
                <Icon type="ionicon" name='home' color={props.color} />
              ),
            }}
          />

          <Tab.Screen name="Devices"
            component={Device}
            options={{
              title: 'Devices',
              headerStyle: styles.banner,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              tabBarIcon: (props) => (
                <Icon type="ionicon" name='easel-outline' color={props.color} />
              ),
            }}
          />

          <Tab.Screen name="Revenue"
            component={Revenue}
            options={{
              title: 'Revenue',
              headerStyle: styles.banner,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              tabBarIcon: (props) => (
                <Icon type="ionicon" name='cash-outline' color={props.color} />
              ),
            }}
          />

          <Tab.Screen name="Order"
            component={Order}
            options={{
              title: 'Order',
              headerStyle: styles.banner,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              tabBarIcon: (props) => (
                <Icon type="ionicon" name='cart-outline' color={props.color} />
              ),
            }}
          />

          <Tab.Screen name="Account"
            component={Account}
            options={{
              title: 'Account',
              headerStyle: styles.banner,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              tabBarIcon: (props) => (
                <Icon type="ionicon" name='people-outline' color={props.color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // header style text in center
  banner: {
    backgroundColor: '#fe6028',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainComponent;