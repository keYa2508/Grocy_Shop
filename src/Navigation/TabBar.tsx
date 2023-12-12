/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Map from '../Screens/Map';
import Home from '../Screens/Home';
import {Cart_Nav, Home_Nav, Map_Nav} from '.';
import Cart from '../Screens/Cart';

const TabBar = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={Home_Nav}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          height: 70,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name={Home_Nav}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            // <TabIcon focused={focused}/>
            <AntDesign
              name="home"
              size={28}
              color={focused ? '#7cf295' : '#8c8f8d'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Map_Nav}
        component={Map}
        options={{
          tabBarIcon: ({focused}) => (
            // <TabIcon focused={focused}/>
            <Entypo
              name="location"
              size={28}
              color={focused ? '#7cf295' : '#8c8f8d'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Cart_Nav}
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            // <TabIcon focused={focused} />
            <AntDesign
              name="shoppingcart"
              size={28}
              color={focused ? '#7cf295' : '#8c8f8d'}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={Home_Nav}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            // <TabIcon focused={focused}/>
            <Octicons
              name="settings"
              size={28}
              color={focused ? '#7cf295' : '#8c8f8d'}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabBar;
