import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Item_Nav, List_Nav, Notification_Nav, Tab_Nav} from './src/Navigation';
import TabBar from './src/Navigation/TabBar';
import List from './src/Screens/List';
import Item from './src/Screens/Item';
import Notification from './src/Screens/Notification';
import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './src/Redux/GlobalRedux';
import {Provider} from 'react-redux';

const store = configureStore({
  reducer: {
    GlobalRedux: CartReducer,
  },
});

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={Tab_Nav}>
              <Stack.Screen name={Tab_Nav} component={TabBar} />
              <Stack.Screen name={List_Nav} component={List} />
              <Stack.Screen name={Item_Nav} component={Item} />
              <Stack.Screen name={Notification_Nav} component={Notification} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
