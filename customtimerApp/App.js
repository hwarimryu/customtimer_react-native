import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {View } from 'react-native';
import Button from './Button';
import HomeScreen from './views/HomeScreen';
import CustomTimer from './views/CustomTimer';
import {MaterialCommunityIcons} from "@expo/vector-icons";


const Stack = createStackNavigator();

function App(){
  return(
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
  )
}

export default App;
