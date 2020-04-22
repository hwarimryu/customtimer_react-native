import React, { Component } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from './Button';
import HomeScreen from './HomeScreen';
import CustomTimer from './CustomTimer';



// class Main extends Component{
//   state={
//     title:"Custom Timer",
//     page:"Home"
//   }
  
//   reload=()=>{
//     Alert.alert("Home")
//     this.setState({page:'Home'});
//     this.forceUpdate()
//   }
//   render(){
//     return(
//       <View style={styles.container}>
//       <View style={styles.header}>

// {/* delete-outline */}
// {/* delete-empty */}
//       <Button onPress={()=>{this.reload()}} style={styles.back} iconName="arrow-left-thick" size='30' color='#fff'/>
//       <Text style={styles.title}>{this.state.title}</Text>
//       <Button style={styles.back} iconName="checkbox-blank-outline" size='30' color='#fff'/>
//       </View>
//       <HomeScreen page={this.state.page} changeTitle={(title)=>{this.setState({title})}}/>

//     </View>
//     )
//   }
// }


// chevron-down-box-outline
// chevron-down-box

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

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
            height:100
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:'25'
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'HOME',
      headerRight:props=><HeaderDelete/>}}/>
        <Stack.Screen name="CustomTimer" component={CustomTimer} options={({route})=>({title:route.params.title,headerRight:props=><HeaderDelete/>})}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    // alignItems:'stretch',
    backgroundColor:'red'
  },
  header:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
    height:'12%',
    // width:'100%',
    backgroundColor:'#8894ff',
    paddingTop:50,
    paddingVertical:5,
    paddingHorizontal:15
  },
  title:{
    width:'80%',
    textAlign:'center',
    color:'white',
    fontSize:30,
    textAlignVertical:"center",
    fontWeight:'bold',
  },
  back:{
    width:'10%',
  }
 
});
