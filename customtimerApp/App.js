import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from './Button';
import Home from './Home';


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
    return(
      <View style={styles.container}>
      <View style={styles.header}>

{/* delete-outline */}
{/* delete-empty */}
      <Button onPress={()=>{this.reload()}} style={styles.back} iconName="arrow-left-thick" size='30' color='#fff'/>
      <Text style={styles.title}>{this.state.title}</Text>
      <Button style={styles.back} iconName="checkbox-blank-outline" size='30' color='#fff'/>
      </View>
      <Home page={this.state.page} changeTitle={(title)=>{this.setState({title})}}/>

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
