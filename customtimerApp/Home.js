<<<<<<< Updated upstream
import React, { useState, Component } from 'react';
import { StyleSheet, Text,Separator, View,FlatList, Button, Alert, TouchableOpacity } from 'react-native';
=======
import React, { Component } from 'react';
import { StyleSheet, Text, View,FlatList,Picker, TouchableOpacity,AsyncStorage,Modal,TouchableHighlight, Alert } from 'react-native';
>>>>>>> Stashed changes
import CustomTimer from './CustomTimer';
//function으로 하니까 안됌...

export default class extends Component{
    
    state={
        page:this.props.page,
        timers:[
            {id:1,title:"타이머1"},{id:2,title:"타이머2"},{id:3,title:"타이머3"},{id:4,title:"타이머4"},{id:5,title:"타이머5"}
        ],
        timerId:-1,
    }

<<<<<<< Updated upstream
=======
    componentDidMount(){
        Alert.alert(this.state.page);
        // AsyncStorage.setItem('timers',JSON.stringify(this.state.timers));
        AsyncStorage.getItem('timers').then((timers)=>this.setState({'timers':JSON.parse(timers)}));
    }
>>>>>>> Stashed changes
    openTiemr=(id,title)=>{
        console.log(id);
        this.props.changeTitle(title);
        this.setState({page:"Timer",timerId:id});
    }

    render() {
        if(this.state.page==="Home"){
            return (
<<<<<<< Updated upstream
=======
                <View style={styles.container}>
                {/* <Modal
                // style={{backgroundColor:'black', height: '50%'}}
                animationType='slide'
                presentationStyle='overFullScreen'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.newTimerModal}>
                <TimePicker time={this.state.minute} onMinuteChange={(minute)=>{this.setState({minute})}}></TimePicker>
                <TimePicker time={this.state.seconds} onMinuteChange={(seconds)=>{this.setState({seconds})}}></TimePicker>

                </View>
                </Modal> */}
>>>>>>> Stashed changes
                <FlatList style={styles.customTimerList} data={this.state.timers}
                  renderItem={({item}) => <TouchableOpacity  onPress={()=>this.openTiemr(item.id,item.title)}><Text style={styles.customTimerItem}> {item.title} </Text></TouchableOpacity>
                }
                />
<<<<<<< Updated upstream
=======
                {/* <View style={styles.newBtn}>
                <Button onPress={()=>this.addNewTimer()} iconName='plus-circle' color='tomato' size='90'/>
                </View> */}
                
                </View>
>>>>>>> Stashed changes
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