import React, { Component } from 'react';
<<<<<<< Updated upstream
import { StyleSheet, Text, View, Button } from 'react-native';
=======
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from './Button';
>>>>>>> Stashed changes
import Home from './Home';
import { reload } from 'expo/build/Updates/Updates';


class Main extends Component{
  state={
    title:"Custom Timer",
    page:"Home"
  }
  
  reload=()=>{
    Alert.alert("Home")
    this.setState({page:'Home'});
    this.forceUpdate()
  }
  render(){
    return(<View style={styles.container}>
      {/* < */}
<<<<<<< Updated upstream
      <Text style={styles.header}/>
      <Text style={styles.title}>{this.state.title}</Text>
      <Home changeTitle={function(title){this.setState({title})}.bind(this)}/>
      <Button title="NEW Buttons() 로 바꾸기"></Button>
=======
      <View style={styles.header}>

{/* delete-outline */}
{/* delete-empty */}
      <Button onPress={()=>{this.reload()}} style={styles.back} iconName="arrow-left-thick" size='30' color='#fff'/>
      <Text style={styles.title}>{this.state.title}</Text>
      <Button style={styles.back} iconName="checkbox-blank-outline" size='30' color='#fff'/>
      </View>
      <Home page={this.state.page} changeTitle={(title)=>{this.setState({title})}}/>
>>>>>>> Stashed changes
    </View>
    )
  }
}


// chevron-down-box-outline
// chevron-down-box


export default function App(){

  return (
    <Main/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  header:{
    height:'6%',
    width:'100%',
    backgroundColor:'#8894ff'
  },
  title:{
    height:'5%',
    width:'100%',
    textAlign:'center',
    color:'white',
    fontSize:30,
    textAlignVertical:"center",
    fontWeight:'bold',
    backgroundColor:'#8894ff'
  },
 
});
