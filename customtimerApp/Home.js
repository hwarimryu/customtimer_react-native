import React, { useState, Component } from 'react';
import { StyleSheet, Text,Separator, View,FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import CustomTimer from './CustomTimer';
//function으로 하니까 안됌...

export default class extends Component{
    
    state={
        page:"Home",
        timers:[
            {id:1,title:"타이머1"},{id:2,title:"타이머2"},{id:3,title:"타이머3"},{id:4,title:"타이머4"},{id:5,title:"타이머5"}
        ],
        timerId:-1,
    }

    openTiemr=(id,title)=>{
        console.log(id);
        this.props.changeTitle(title);
        this.setState({page:"Timer",timerId:id});
    }

    render() {
        if(this.state.page==="Home"){
            return (
                <FlatList style={styles.customTimerList} data={this.state.timers}
                  renderItem={({item}) => <TouchableOpacity  onPress={()=>this.openTiemr(item.id,item.title)}><Text style={styles.customTimerItem}> {item.title} </Text></TouchableOpacity>
                }
                />
            );
        }
        else if(this.state.page=="Timer"){
            return(
                <CustomTimer/>
            )
        }
        
    }
}
const styles = StyleSheet.create({
    customTimerList: {
        marginTop:15,
        height:'80%',
        width:'100%',
    },
    customTimerItem:{
        color:"black",
        marginTop:15,
        marginBottom:15,
        fontSize:25,
        textAlign:'center'
    }
});