import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import Button from './Button';
import TimePicker from './TimePicker';
import {MaterialCommunityIcons} from "@expo/vector-icons";

class NewTimerForm extends Component{

    state={
        hours:0,
        minute:0,
        seconds:0
    }
    render(){
        return(
            <View  style={styles.timerForm}>
                <View style = {styles.timePicker}>
                <TimePicker time={this.state.hours} onMinuteChange={(hours)=>{this.setState({hours})}}></TimePicker>
                </View>
                <Text style = {styles.timePicker}> : </Text>
                <View style = {styles.timePicker}>
                <TimePicker time={this.state.minute} onMinuteChange={(minute)=>{this.setState({minute})}}></TimePicker>
                </View>
                <Text style = {styles.timePicker}> : </Text>
                <View style = {styles.timePicker}>
                <TimePicker  style = {styles.timePicker} time={this.state.seconds} onMinuteChange={(seconds)=>{this.setState({seconds})}}></TimePicker>
                </View >

            </View>  
        )
    }
}
let timerInterval;

export default class extends Component{
    
    state={
        id:1,
        title:"",
        timeList:[{id:1,time:3},{id:2,time:10}],
        next_id:0,
        timer_on:false,
        form_on:false

    }
    
    initialState={
        id:1,
        title:"",
        timeList:[{id:1,time:3},{id:2,time:10}],
        next_id:0,
        timer_on:false,
        form_on:false

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
    

    addNewTimer=()=>{
        this.setState({form_on:true});
        
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.settingTop}>
                    
                <TouchableHighlight style={styles.settingItem}>< Text style={{fontSize:20, fontWeight:'bold'}}>REPEAT   5</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.settingItem}><Text style={{fontSize:20, fontWeight:'bold'}} >SOUND   <MaterialCommunityIcons name='music-off'size='25' color='black'/></Text></TouchableHighlight>
                </View>
                <View  style={styles.timeList}>
                <FlatList  data={this.state.timeList} renderItem={({item})=>
                <TouchableOpacity><Text style={styles.timeItem}>{item.time}</Text></TouchableOpacity>}/>
                </View>
                <View style={styles.addButton} >
                <Button onPress={()=>this.addNewTimer()} iconName='plus-circle' size='45' color='#8894ff' />
                </View>
                {this.state.form_on ? <NewTimerForm/>:(<></>)}

                <View style={styles.buttons}>
                    <TextInput></TextInput>
                    {
                        this.state.timer_on ? (<>
                            <Button iconName='play-circle' onPress={()=>this.startTimer(1)} size='70' color='#aaa'></Button>
                            <Button iconName='pause-circle' onPress={()=>this.pauseTimer()} size='70' color='#ffcf00'></Button>
                            <Button iconName='stop-circle' onPress={()=>this.stopTimer()} size='70' color='tomato'></Button>
                        </>):
                        (<>
                            <Button iconName='play-circle' onPress={()=>this.startTimer(1)} size='70' color='tomato'></Button>
                            <Button iconName='pause-circle' onPress={()=>this.pauseTimer()} size='70' color='#aaa'></Button>
                            <Button iconName='stop-circle' onPress={()=>this.stopTimer()} size='70' color='#aaa'></Button>
                        </>
                        )
                    }
                </View>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,
        alignItems:'center',

    },
    settingTop:{
        width:'100%',
        flexDirection:'row',
        // backgroundColor:'#ffcf00',


    },
    settingItem:{
        flex:1,
        padding:10,
        fontSize:50,
        borderColor:'#8894ff',
        borderWidth:1.5,
        borderBottomWidth:3,
        alignItems:'center',
        flexDirection:'row',
    },

    
    timeList: {
        marginTop:15,
        height:'80%',
        width:'100%',
    },
    timeItem:{
        color:"black",
        marginTop:15,
        marginBottom:15,
        fontSize:30,
        textAlign:'center'

    },
    buttons:{
        width:'100%',
        // backgroundColor:'black',
        flexDirection: 'row',
        position:'absolute',
        bottom:20,
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingRight:20
    },
    
    addButton:{
        paddingTop:15,
    },
    timerForm:{
        backgroundColor:'white',
        height:250,
        width:'90%',
        marginLeft:'5%',
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        top:'40%',
        // color:'white'
    },
    timePicker:{
        marginVertical:10,
        lineHeight:215,
        color:'white'


    }
});