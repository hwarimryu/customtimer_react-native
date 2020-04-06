import React, { useState, Component } from 'react';
import { StyleSheet, Text,Separator, View,FlatList, Alert, TouchableOpacity } from 'react-native';
import CustomTimer from './CustomTimer';
import Button from './Button';
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
                <View style={styles.container}>
                <FlatList style={styles.customTimerList} data={this.state.timers}
                  renderItem={({item}) => 
                  <TouchableOpacity  onPress={()=>this.openTiemr(item.id,item.title)}>
                      <Text style={styles.customTimerItem}> {item.title} </Text>
                      </TouchableOpacity>
                }
                />
                <View style={styles.newBtn}>
                <Button iconName='plus-circle' color='tomato' size='90'/>
                </View>
                </View>
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
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    customTimerList: {
        marginTop:15,
        width:'100%',
    },
    customTimerItem:{
        color:"black",
        marginTop:15,
        marginBottom:15,
        fontSize:25,
        textAlign:'center'
    },
    newBtn:{
        position: 'absolute',
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 45,
    }
});