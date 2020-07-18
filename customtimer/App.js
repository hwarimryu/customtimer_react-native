/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from './views/HomeScreen.js';
import CustomTimer from './views/CustomTimer.js';
import {createStore} from 'redux';
import {Provider}  from 'react-redux';
import reducer from './src/reducer.js';

let store = createStore(reducer);
console.log("store",store.getState());
const Stack = createStackNavigator();

function App(){
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8894ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },
          headerBackTitleVisible:false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title:' '}}/>

        <Stack.Screen name="CustomTimer" component={CustomTimer} options={({route})=>({title:route.params.title})}/>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
