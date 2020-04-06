import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import Button from './Button';
let timerInterval;
export default class extends Component{
    
    state={
        id:1,
        title:"",
        timeList:[{id:1,time:3},{id:2,time:10}],
        next_id:0,
        timer_on:false
    }
    initialState={
        id:1,
        title:"",
        timeList:[{id:1,time:3},{id:2,time:10}],
        next_id:0,
        timer_on:false

    }
 
    
    startTimer=  (timeId)=> {
        console.log("startTimer");
        this.state.timeList.filter( (e)=>{
            if(e.id===timeId){
                this.setState({next_id:timeId+1,timer_on:true});
                timerInterval= setInterval(()=>{
                    e.time--;
                    this.setState(this.state);
                    if(e.time===0){
                        this.nextTimer();
                    }
                },1000);
            }
        });
    }
    stopTimer=()=>{
        console.log("stopTimer");
        clearInterval(timerInterval);
        this.setTimerInitial();
    }
    pauseTimer=()=>{
        console.log("pauseTimer");
        clearInterval(timerInterval);
        this.setState({timer_on:false});
    }
    nextTimer=()=>{
        this.pauseTimer();
        this.startTimer(this.state.next_id);
    }
    setTimerInitial=()=>{
        console.log("setInitial");
        this.setState(this.initialState);
    }
    
    render(){
        return(
            <View>
                <FlatList  style={styles.timeList} data={this.state.timeList} renderItem={({item})=>
                <TouchableOpacity><Text style={styles.timeItem}>{item.time}</Text></TouchableOpacity>}/>
                <View style={styles.buttons}>
                    <TextInput></TextInput>
                    {
                        this.state.timer_on ? (<>
                            <Button iconName='bell' onPress={()=>Alert.alert('bell')} size='50' color='#ffcf00'></Button>
                            <Button iconName='repeat' onPress={()=>Alert.alert('bell')} size='50' color='#8894ff'></Button>
                            <Button iconName='play-circle' onPress={()=>this.startTimer(1)} size='80' color='#aaa'></Button>
                            <Button iconName='pause-circle' onPress={()=>this.pauseTimer()} size='80' color='#ffcf00'></Button>
                            <Button iconName='stop-circle' onPress={()=>this.stopTimer()} size='80' color='tomato'></Button>
                        </>):
                        (<>
                            <Button iconName='bell' onPress={()=>Alert.alert('bell')} size='50' color='#ffcf00'></Button>
                            <Button iconName='repeat' onPress={()=>Alert.alert('bell')} size='50' color='#8894ff'></Button>
                            <Button iconName='play-circle' onPress={()=>this.startTimer(1)} size='80' color='tomato'></Button>
                            <Button iconName='pause-circle' onPress={()=>this.pauseTimer()} size='80' color='#aaa'></Button>
                            <Button iconName='stop-circle' onPress={()=>this.stopTimer()} size='80' color='#aaa'></Button>
                        </>
                        )
                    }
                </View>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    timeList: {
        marginTop:15,
        height:'75%',
        width:'100%',
    },
    timeItem:{
        color:"black",
        marginTop:15,
        marginBottom:15,
        fontSize:25,
        textAlign:'center'
    },
    buttons:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});