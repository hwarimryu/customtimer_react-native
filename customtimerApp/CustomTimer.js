import React, { useState, Component } from 'react';
import { AsyncStorage,StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, TouchableWithoutFeedback, TouchableHighlight, Systrace } from 'react-native';
import Button from './Button';
import TimePicker from './TimePicker';
import {MaterialCommunityIcons} from "@expo/vector-icons";
function timeItem(time){    
    let seconds = time%60;
    let min=0;//(time/60);
    let hours=0//time/3600;

    if(seconds<10){
        seconds = '0'+seconds.toFixed(0);
    }else seconds=seconds.toFixed(0);

    if(time>3600){
        hours=time/3600;
    }
    if(hours<10){
        hours = '0'+hours.toFixed(0);
    }else hours=hours.toFixed(0);

    if(time>60){
        min=(time/60)%60;
    }
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
let next_id=1;
export default class extends Component{
    
    state={
        id:'time_list_'+this.props.route.params.id,
        title:"",
        timeList:[],
        timer_on:false,
        form_on:false

    }
    
    initialState={
        id:'time_list_'+this.props.route.params.id,
        timeList:[],
        timer_on:false,
        form_on:false

    }
 
    componentDidMount=()=>{
        console.log(this.props.route.params.id)
        // AsyncStorage.setItem('time_list_1',JSON.stringify([{id:1,time:3},{id:2,time:2}]));
        // AsyncStorage.getItem(this.state.id).then((timeList)=>this.setState({'timeList':JSON.parse(timeList)}));
        AsyncStorage.getItem(this.state.id).then((timeList)=>{
            this.setState({'timeList':JSON.parse(timeList)})
            this.initialState.timeList=JSON.parse(timeList)
        });

    }
    startTimer=  (timeId)=> {
        console.log("startTimer");
        if(next_id>this.state.timeList.length) console.log("!!")
        console.log(this.state.timeList.length)
        console.log(next_id)
        this.state.timeList.filter( (e)=>{
            if(e.id===timeId){
                
                this.setState({timer_on:true});
                timerInterval= setInterval(()=>{
                    e.time--;
                    if(e.time==-1){

                    }else if(e.time>0){
                        this.setState(this.state);
                    }else{
                        next_id=timeId+1;
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

        this.startTimer(next_id);
    }
    setTimerInitial=()=>{
        console.log("setInitial");
        this.setState(this.initialState);
        // this.setState({timer_on:false});

    }
    

    addNewTime=(new_time)=>{
        this.initialState.timeList.push({id:this.initialState.timeList.length+1,time:new_time})
        AsyncStorage.setItem(this.state.id,JSON.stringify(this.initialState.timeList))
        this.setState(this.initialState)
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
                <FlatList  data={this.state.timeList} renderItem={({item})=>
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
        maxHeight:'70%',
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
        paddingTop:15,
    },
    timerForm:{
        backgroundColor:'white',
        height:300,
        width:'90%',
        marginLeft:'5%',
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        top:'40%',
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