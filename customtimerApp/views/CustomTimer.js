import React, { Component } from 'react';
import { AsyncStorage,StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, TouchableWithoutFeedback, TouchableHighlight, Systrace } from 'react-native';
import Button from '../Button';
import TimePicker from '../components/TimePicker';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Audio } from 'expo-av';

const soundObject = new Audio.Sound();
soundObject.loadAsync(require('../assets/sounds/note.mp3'))

function timeItem(time){  
    var hours=time/3600;
    var min=Math.floor(time/60);
    var seconds = time%60;

    if(seconds<10){
        seconds = '0'+seconds.toFixed(0);
    }else seconds=seconds.toFixed(0);

    if(hours<10){
        hours = '0'+hours.toFixed(0);
    }else hours=hours.toFixed(0);

    if(min<10){
        min = '0'+min.toFixed(0);
    }else min=min.toFixed(0);
    
    return (
        <Text style={styles.timeItem}>{hours} : {min} : {seconds}</Text>
    )
}
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
                <View style={styles.formButtons}>
                <TouchableOpacity onPress={()=>this.props.cancleNewTime()} style={{flex:1}}><Text style={styles.formButton}>CANCLE</Text></TouchableOpacity>
                <Text style={{flex:1}}/>
                <TouchableOpacity onPress={()=>{
                    let new_time= this.state.hours*60*60+this.state.minute*60+this.state.seconds;
                    this.props.addNewTime(new_time);
                }} style={{flex:1}}><Text style={styles.formButton}>OK</Text></TouchableOpacity>
                </View>

            </View>  
        )
    }
}
let timerInterval;
let cur=1;
let length=0;
let initialState={
    time_list:[],
    timer_on:false,
    form_on:false

}
export default class extends Component{
    
    state={
        id:'time_list_'+this.props.route.params.id,
        title:"",
        time_list:[],
        timer_on:false,
        form_on:false

    }
    
    
 
    componentDidMount=()=>{
        console.log(this.props.route.params.id)
        // AsyncStorage.setItem('time_list_1',JSON.stringify([{id:1,time:3},{id:2,time:2}]));
        AsyncStorage.getItem(this.state.id).then((res)=>{
            if(res==null) return
            var time_list = JSON.parse(res);
            this.setState({'time_list':time_list})
            initialState.time_list= JSON.parse(res);
            length = initialState.time_list.length;
            // initialState.time_list=time_list
            // time_list=JSON.parse(time_list)
        });

    }
    startTimer=   (timeId)=> {
        console.log("startTimer");
       
        this.state.time_list.filter( (e)=>{
            console.log(e.id+" "+ cur +" "+e.time);

            if(e.id===timeId){
                this.setState({timer_on:true});
                // pause, stop 버튼 활성화
                // start 버튼 비활성화

                timerInterval= setInterval(()=>{
                    e.time--;
                    console.log(e.time);
                    soundObject.stopAsync()                   

                    if(e.time<=0){
                        try {
                             soundObject.playAsync()                   
                                     // Your sound is playing!
                          } catch (error) {
                            // An error occurred!
                          }
                        cur++;
                        if(cur>length) {
                            this.stopTimer();
                        
                        }
                        else this.nextTimer();
                    }
                    this.setState(this.state);
                   
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
        this.startTimer(cur);
    }
    setTimerInitial=()=>{
        console.log("setInitial");
        this.setState(initialState);
        cur=1;
    }
    

    addNewTime=async (new_time)=>{
        this.state.time_list.push({id:initialState.time_list.length+1,time:new_time})

       await AsyncStorage.setItem(this.state.id,JSON.stringify(initialState.time_list))

    }
    openNewTimeForm=()=>{
        this.setState({form_on:true});
    }
    cancleNewTime=()=>{
        this.setState({form_on:false});
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
                <FlatList  data={this.state.time_list} renderItem={({item})=>
                    <TouchableOpacity>
                        {timeItem(item.time)}
                        {/* <TimeItem time={item.time}/> */}
                    </TouchableOpacity>}/>
                </View>
                <View style={styles.addButton} >
                <Button onPress={()=>this.openNewTimeForm()} iconName='plus-circle' size='45' color='#8894ff' />
                </View>
                {this.state.form_on ? <NewTimerForm addNewTime={(new_time)=>this.addNewTime(new_time)} cancleNewTime={()=>this.cancleNewTime()}/>:(<></>)}

                <View style={styles.buttons}>
                    <TextInput></TextInput>
                    {
                        this.state.timer_on ? (<>
                            <Button iconName='play-circle' onPress={()=>this.startTimer(cur)} size='70' color='#aaa'></Button>
                            <Button iconName='pause-circle' onPress={()=>this.pauseTimer()} size='70' color='#ffcf00'></Button>
                            <Button iconName='stop-circle' onPress={()=>this.stopTimer()} size='70' color='tomato'></Button>
                        </>):
                        (<>
                            <Button iconName='play-circle' onPress={()=>this.startTimer(cur)} size='70' color='tomato'></Button>
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
        marginTop:-1.5
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
        maxHeight:'60%',
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
        height:105,
        backgroundColor:'#fff',
        flexDirection: 'row',
        position:'absolute',
        bottom:0,
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingRight:20
    },
    
    addButton:{
        paddingTop:10,
    },
    timerForm:{
        backgroundColor:'white',
        height:300,
        width:'90%',
        marginLeft:'5%',
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        top:'25%',
        borderRadius:35,
    },
    timePicker:{
        marginVertical:20,
        lineHeight:215,
        color:'black'
    },
    formButtons:{
        width:'100%',
        flex:1,
        height:40,
        position:'absolute',
        bottom:0,
        alignContent:'space-between',
        flexDirection:'row',
    },
    formButton:{
        color:'#555',
        fontSize:15,
        fontWeight:'bold',
        textAlign:"center"
    }
});