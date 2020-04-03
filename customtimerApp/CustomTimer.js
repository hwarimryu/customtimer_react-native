import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default class extends Component{
    state={
        id:1,
        title:"",
        timeList:[{id:1,time:300},{id:2,time:10}],
    }
    render(){
        return(
        <FlatList style={styles.timeList} data={this.state.timeList} renderItem={({item})=><TouchableOpacity><Text style={styles.timeItem}>{item.time}</Text></TouchableOpacity>}/>
        )
    }

}
const styles = StyleSheet.create({
    timeList: {
        marginTop:15,
        height:'80%',
        width:'100%',
    },
    timeItem:{
        color:"black",
        marginTop:15,
        marginBottom:15,
        fontSize:25,
        textAlign:'center'
    }
});