import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import Home from './Home';


class Main extends Component{
  state={
    title:"Custom Timer"
  }
  changeTitle=(title)=>{
    
  }
  render(){
    return(<View style={styles.container}>
      {/* < */}
      <View style={styles.header}>
      <Button style={styles.back} iconName="chevron-left" size='30' color='#8894ff'/>
      <Text style={styles.title}>{this.state.title}</Text>
      <Button style={styles.back} iconName="square-o" size='30' color='#fff'/>
      </View>
      <Home changeTitle={function(title){this.setState({title})}.bind(this)}/>
    </View>
    )
  }
}


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
