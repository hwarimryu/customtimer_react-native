import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {View } from 'react-native';
import Button from './Button';
import HomeScreen from './HomeScreen';
import CustomTimer from './CustomTimer';
import {MaterialCommunityIcons} from "@expo/vector-icons";

function HeaderDelete(){
  return(
    <View style={{marginRight:10}}>
    <Button iconName='delete' color='#fff' size='25'></Button>
    </View>
  )
}
function CustomTimerTtle(){
  return(
    <View></View>
  )
}

const Stack = createStackNavigator();

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8894ff',
            height:80
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:'25'
          },
          headerBackTitleVisible:false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'HOME',headerRight:props=><HeaderDelete/>}}/>
        <Stack.Screen name="CustomTimer" component={CustomTimer} options={({route})=>({title:route.params.title,headerRight:props=><HeaderDelete/>})}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
