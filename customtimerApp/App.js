import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
      <Text style={styles.header}/>
      <Text style={styles.title}>{this.state.title}</Text>
      <Home changeTitle={function(title){this.setState({title})}.bind(this)}/>
      <Button title="NEW Buttons() 로 바꾸기"></Button>
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
