import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import HomePage from './screens/HomePage';
import Device from './screens/Device';
import Revenue from './screens/Revenue';
import Account from './screens/Account';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

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
