
import React, { Component } from 'react';
import { StyleSheet, Text, View,FlatList,Picker, TouchableOpacity,AsyncStorage,Modal,TouchableHighlight, Alert } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {MaterialCommunityIcons} from "@expo/vector-icons";

import Button from './Button';

//function으로 하니까 안됌...
class TimerItem extends Component{
    state={
        title:this.props.item.title,
        id: this.props.item.id,
        isDeleteOn:false
        
    }
    render(){
        return(
             this.state.isDeleteOn?
            (<GestureRecognizer style={styles.customTimerItem} onSwipeRight={()=>this.setState({isDeleteOn:false})}>
            <Text style={styles.customTimerTitle}> {this.state.title} </Text>
            <TouchableOpacity style={styles.deleteOneButton}>
            <MaterialCommunityIcons onPress={()=>this.props.deleteTimer(this.state.id)} size='35' name='window-close' color='white'/>
            </TouchableOpacity>
            </GestureRecognizer>)
           : (<GestureRecognizer style={styles.customTimerItem} onSwipeLeft={()=>this.setState({isDeleteOn:true})}>
             <TouchableHighlight  style={{flex:1}}
                  onPress={()=>this.props.navigation.navigate('CustomTimer',{
                    id:this.state.id,
                    title:this.state.title,
                  })}><Text style={styles.customTimerTitle}> {this.state.title} </Text>
           </TouchableHighlight></GestureRecognizer>)

            
            
        )
    }
}
export default class HomeScreen extends Component{
    state={
        page:'Home',
        timers:[
            // {id:1,title:"test_timer1"},{id:2,title:"test_timer2"},{id:3,title:"test_timer3"},{id:4,title:"test_timer4"},{id:5,title:"test_timer5"}
        ],
        timerId:-1,
        modalVisible: false,
        minute:0,
        seconds:0

    }

    setModalVisible=(visible) =>{
        this.setState({modalVisible: visible});
    }

    componentDidMount(){
        Alert.alert(this.state.page);
        // AsyncStorage.setItem('timers',JSON.stringify(this.state.timers));
        AsyncStorage.getItem('timers').then((timers)=>this.setState({'timers':JSON.parse(timers)}));
    }

    openTiemr=(id,title)=>{
        console.log(id);
        this.props.changeTitle(title);
        this.setState({page:"Timer",timerId:id});
       
//   저장되어 있는 데이터의 키값 가져오기=> array형태로 반환
    }
    deleteTimer=(item)=>{
        let idx = this.state.timers.indexOf(item);
        console.log(id);
        this.state.timers.splice(idx,1);
        AsyncStorage.setItem('timers',JSON.stringify(this.state.timers));
        this.setState({timers:this.state.timers})
        // Alert.alert(id);
        console.log(id);
        // AsyncStorage.setItem('timers',JSON.stringify(this.state.timers));
    }
    addNewTimer=()=>{
        this.setModalVisible(true);
    }
    openNewTimerForm=()=>{
        Alert.prompt('새 타이머 이름','',(new_title)=>{
            let timers = this.state.timers;
            timers.push({id:timers.length+1,title:new_title});
            this.setState({timers});
            AsyncStorage.setItem('timers',JSON.stringify(this.state.timers));
            console.log(timers.length);
        })
    }
    render() {
            return (
            
                <View style={styles.container}>
                <FlatList style={styles.customTimerList} data={this.state.timers}
                  renderItem={({item}) => 
                  <TimerItem key={item.id} item={item} navigation={this.props.navigation} deleteTimer={(id)=> this.deleteTimer(item)}/>}/>
                <View style={styles.newBtn}>
                <Button iconName='plus-circle' color='tomato' size='80' onPress={()=> this.openNewTimerForm()}/>
                </View>
                </View>
            );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    customTimerList: {
        marginTop:15,
        maxHeight:'80%',
        width:'100%',
        flex:1
        // backgroundColor:'yellow'
    },
    customTimerItem:{
        flex:1,
        flexDirection:'row',
    },
    customTimerTitle:{
        color:"black",
        paddingTop:15,
        paddingBottom:15,
        fontSize:30,
        textAlign:'center',
        flex:1
    },
    deleteOneButton:{
        color:"white",
        backgroundColor:'tomato',
        paddingTop:15,
        alignItems:'center',
        flex:0.2
    },
    newBtn:{
        position: 'absolute',
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 25,
    },

});