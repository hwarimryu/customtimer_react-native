import React, { Component } from 'react';
import { AsyncStorage,StyleSheet, Text, View,FlatList,Picker, TouchableOpacity,Modal,TouchableHighlight, Alert, CheckBox } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../src/components/Button.js';
import TimePicker from '../src/components/TimePicker.js';

import SoundPlayer from 'react-native-sound-player'

import BackgroundTimer from "react-native-background-timer";

import {connect} from 'react-redux';
import {bindActionCreators, createStore} from 'redux';
import {actionCreators as timerActions} from '../src/reducer'

// import
function timeItem(time,isDeleteOn){  
    var hours=time/3600;
    var min=Math.floor(time/60);
    var seconds = time%60;
    // var isDeleteOn = false;

    if(seconds<10){
        seconds = '0'+seconds.toFixed(0);
    }else seconds=seconds.toFixed(0);

    if(hours<10){
        hours = '0'+hours.toFixed(0);
    }else hours=hours.toFixed(0);

    if(min<10){
        min = '0'+min.toFixed(0);
    }else min=min.toFixed(0);
    


    return(
        isDeleteOn?
       (<GestureRecognizer style={styles.customTimerItem} onSwipeRight={()=>this.setState({isDeleteOn:false})}>
            <Text style={styles.timeItem}>{hours} : {min} : {seconds}</Text>           <TouchableOpacity style={styles.deleteOneButton}>
           {/* <Icon onPress={()=>this.props.deleteTimer(this.state.id)} size={35} name='window-close' color='white'/> */}
           </TouchableOpacity></GestureRecognizer>
       ):(<GestureRecognizer style={styles.customTimerItem} onSwipeLeft={()=>this.setState({isDeleteOn:true})}>
                   <Text style={styles.timeItem}>{hours} : {min} : {seconds}</Text>
        </GestureRecognizer>
       )
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

class SetRepeatForm extends Component{
    state={
        num:0
    }
    render(){
        return (
            <View  style={styles.timerForm}>
                <View style = {styles.timePicker}>
                <TimePicker time={this.state.num} onMinuteChange={(num)=>{this.setState({num})}}></TimePicker>
                </View>

                <View style={styles.formButtons}>
                <TouchableOpacity onPress={()=>this.props.cancle()} style={{flex:1}}><Text style={styles.formButton}>CANCLE</Text></TouchableOpacity>
                <Text style={{flex:1}}/>
                <TouchableOpacity onPress={()=>{this.props.confirm(this.state.num)}} style={{flex:1}}><Text style={styles.formButton}>OK</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
    
}
let timerInterval;
let cur=1;
let length=0;
// let initialState={
//     time_list:[],
//     timer_on:false,
//     form_on:false,
// }
let repeat=1;
class CustomTimer extends Component{
    
    state={
        // isPlaying:false,
        thisTimerIsPlaying:false,
        id:this.props.route.params.id,
        title:this.props.route.params.title,
        time_list:[],
        length:0,
        timer_on:false,
        form_on:false,
        repeat_form_on:false,
        repeat: 1,
        // cur:1
    }

    componentDidMount=()=>{
        console.log(JSON.stringify(this.props))
        // console.log(this.props.isPlaying)
        // initialState.time_list=[]
       
        if(this.props.thisTimerIsPlaying&&this.props.cur_timer_id == this.props.route.params.id){
            console.log('timer '+ this.props.route.params.title +' is playing')
            this.state.thisTimerIsPlaying= true;

            // this.setState(this.props)
            // console.log(this.state.time_list)
            // this.props.openTimer()
        }else{
            // var id=this.props.id;
            console.log('this '+ this.props.route.params.id+' is not playing')
            this.state.thisTimerIsPlaying= false
           
        }

        AsyncStorage.getItem(this.state.id).then((res)=>{
            if(res==null) this.setState({'time_list':[]})
            else {
                var time_list = JSON.parse(res);
                this.setState({'time_list':time_list})
                this.state.length = this.state.time_list.length;
            }
        });
        // AsyncStorage.setItem('time_list_1',JSON.stringify([{id:1,time:3},{id:2,time:2}]));
        

        SoundPlayer.onFinishedLoading((success) => {
            console.log('finished loading', success)
          })

    }

    playBell=() =>{
        try {
            SoundPlayer.loadSoundFile('note', 'mp3');
            SoundPlayer.play();
          } catch (e) {
            console.log(`cannot play the sound file`, e)
          }
       
      }
   


    // startTimer=   (timeId)=> {
    //     console.log("startTimer");

    //     // repeat = this.state.repeat;

    //     this.props.playTimer()

    //     this.state.time_list.filter( (e)=>{
    //         console.log(e.id+" "+ cur +" "+e.time);

    //         if(e.id===timeId){
    //             this.setState({timer_on:true});
    //             // pause, stop 버튼 활성화
    //             // start 버튼 비활성화
    //             // console.log(initialState.time_list);

    //             timerInterval=BackgroundTimer.setInterval(()=>{
    //                 e.time--;
    //                 console.log(e.time);

    //                 if(e.time<=0){
    //                     this.playBell();

    //                     cur++;
                       
    //                     if(cur>length) {
    //                         if(repeat>=this.state.repeat){
    //                             this.stopTimer()                             
    //                             return
    //                         }else {
    //                             console.log("repeat: "+repeat);
    //                             this.state.time_list =JSON.parse(initialState.time_list);
    //                             cur=1
    //                             repeat++;
    //                             this.nextTimer();
    //                         }
    //                     }
    //                     else this.nextTimer();
    //                 }

    //                 this.setState(this.state);
                   
    //             },1000);
    //         }
    //     });

    // }
    
    stopTimer=()=>{
        console.log("stopTimer");
        // clearInterval(timerInterval);

        BackgroundTimer.clearInterval(timerInterval);
        this.setTimerInitial()
    }
    pauseTimer=()=>{
        console.log("pauseTimer");
        BackgroundTimer.clearInterval(timerInterval);
        this.setState({'timer_on':false});
    }
    nextTimer=()=>{
        this.pauseTimer();
        this.props.startTimer(cur);
    }
    setTimerInitial=()=>{
        console.log("setInitial");
        this.props.stopTimer()

        this.state.time_list =this.props.time_list;
        // JSON.parse(initialState.time_list);
        this.state.timer_on=false
        this.setState(this.state);
        cur=1;
        repeat=1;
    }
    
  

    addNewTime=async (new_time)=>{
        var thisTimeList = this.state.time_list
        var id = ""+this.state.id

        thisTimeList.push({id:thisTimeList.length+1,time:new_time})
        await AsyncStorage.setItem(id,JSON.stringify(thisTimeList))
        await AsyncStorage.getItem(id).then((res)=>{
            if(res==null) {
                thisTimeList= []
            }
            else thisTimeList = JSON.parse(res);
            this.setState({'time_list':thisTimeList,'form_on':false,'length':thisTimeList.length})
            });
    }
    openNewTimeForm=()=>{
        this.setState({form_on:true});
    }
    cancleNewTime=()=>{
        this.setState({form_on:false});
    }


    setRepeat=()=>{
        this.setState({repeat_form_on:true})
    }
    cancleSetRepeat=()=>{
        this.setState({repeat_form_on:false})

    }
    

    render(){
        const timerStore= this.props.store
        console.log(JSON.stringify(timerStore))
        let timeItems
        let buttons

        if(timerStore.thisTimerIsPlaying&&timerStore.cur_timer_id==this.state.id){
            console.log('this is playing')
            timeItems = 
                <FlatList  data={timerStore.time_list} renderItem={({item})=>
                <View>{timeItem(item.time)}</View>}/>

            buttons = 
                <><Button iconName='play-circle' size={70} color='#aaa'></Button>
                <Button iconName='pause-circle' onPress={()=>this.pauseTimer()} size={70} color='#ffcf00'></Button>
                <Button iconName='stop-circle' onPress={()=>this.props.stopTimer({
                    ...this.state
                })} size={70} color='tomato'></Button></>
        }else {
            console.log('this is not playing')
            timeItems= 
                <FlatList  data={this.state.time_list} renderItem={({item})=>
                <TouchableOpacity>{timeItem(item.time)}</TouchableOpacity>}/>
            buttons = 
                <><Button iconName='play-circle' onPress={()=>{
                    this.state.thisTimerIsPlaying= true
                    this.props.playTimer({
                        ...this.state,
                        cur_timer_id: this.state.id,
                    })
                }} size={70} color='tomato'></Button>
                <Button iconName='pause-circle' size={70} color='#aaa'></Button>
                <Button iconName='stop-circle' size={70} color='#aaa'></Button></>
        }

        return(
            <View style={styles.container}>
                <View style={styles.settingTop}>
                    <TouchableHighlight style={styles.settingItem} onPress={()=>this.setRepeat()}>
                        < Text style={{fontSize:20, fontWeight:'bold'}}>REPEAT   {this.state.repeat}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.settingItem}>
                        <Text style={{fontSize:20, fontWeight:'bold'}} >SOUND<Icon name='music-off'size={25} color='black'/></Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.timeList}>
                    {timeItems}
                </View>
                <View style={styles.addButton}>
                    <Button onPress={()=>this.openNewTimeForm()} iconName='plus-circle' size={45} color='#8894ff' />
                </View>
                
                {this.state.form_on ? <NewTimerForm addNewTime={(new_time)=>this.addNewTime(new_time)} cancleNewTime={()=>this.cancleNewTime()}/>:(<></>)}
                {this.state.repeat_form_on ? <SetRepeatForm confirm={(num)=>this.setState({repeat:num,repeat_form_on:false})} cancle={()=>this.cancleSetRepeat()}/>:(<></>)}

                <View style={styles.buttons}>
                    {buttons}
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

function mapStateToProps(state){
    const store = {//props에 store라는 이름으로 저장된다.
        ...state
    };    

    return {
        store
    }
}

function mapDispatchToProps(dispatch){
    return {
        playTimer: bindActionCreators(timerActions.playTimer,dispatch),
        countTimer: bindActionCreators(timerActions.countTimer,dispatch),
        pauseTimer: bindActionCreators(timerActions.pauseTimer,dispatch),
        replayTimer: bindActionCreators(timerActions.replayTimer,dispatch),
        stopTimer: bindActionCreators(timerActions.stopTimer,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomTimer);

