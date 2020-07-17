
import React, { Component } from 'react';
import { AsyncStorage,StyleSheet, Text, View,FlatList,Picker, TouchableOpacity,Modal,TouchableHighlight, Alert, CheckBox } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button.js';



class TimerItem extends Component{
    state={
        title:this.props.item.title,
        id: this.props.item.id,
        isDeleteOn:false,        
    }
    render(){
        return(
             this.state.isDeleteOn?
            (<GestureRecognizer style={styles.customTimerItem} onSwipeRight={()=>this.setState({isDeleteOn:false})}>
                <Text style={styles.customTimerTitle}> {this.state.title} </Text>
                <TouchableOpacity style={styles.deleteOneButton}>
                <Icon onPress={()=>this.props.deleteTimer(this.state.id)} size={35} name='window-close' color='white'/>
                </TouchableOpacity></GestureRecognizer>
            ):(<GestureRecognizer style={styles.customTimerItem} onSwipeLeft={()=>this.setState({isDeleteOn:true})}>
                <TouchableHighlight  style={{flex:1}}
                  onPress={()=>this.props.navigation.navigate('CustomTimer',{
                    id:this.state.id,
                    title:this.state.title
                  })}><Text style={styles.customTimerTitle}> {this.state.title}
                 </Text></TouchableHighlight></GestureRecognizer>
            )
        )
    }
}

export default class HomeScreen extends Component{
    state={
        timers:[
            // {id:1,title:"test_timer1"},{id:2,title:"test_timer2"},{id:3,title:"test_timer3"},{id:4,title:"test_timer4"},{id:5,title:"test_timer5"}
        ],
        modalVisible: false,
        selectClicked:false,
        
    }

    setModalVisible=(visible) =>{
        this.setState({modalVisible: visible});
    }

    componentDidMount= async()=>{
        // AsyncStorage.setItem('timers',JSON.stringify(this.state.timers));
        // console.log(this.props.navigation.header)
        // React.useLayoutEffect(()=>{
            
        // })
        await AsyncStorage.getItem('timers').then((timers)=>this.setState({'timers':JSON.parse(timers)}));
    }

    openNewTimerForm=()=>{
        Alert.prompt('새 타이머 이름','',async (new_title)=>{
            let timers = this.state.timers;
            timers.push({id:new_title,title:new_title});
            await AsyncStorage.setItem('timers',JSON.stringify(timers));
            this.setState({timers});
        })
    }

    clickSelectButton=()=>{

        if(!this.state.selectClicked){ this.setState({ selectClicked:true})}
        else{ this.setState({ selectClicked:false})}
        console.log(this.state.selectClicked)
    }
    deleteTimer= async (item)=>{
        let timers = this.state.timers;

        timers.splice(timers.indexOf(item),1);
        await AsyncStorage.removeItem('time_list_'+item.title)
        await AsyncStorage.setItem('timers',JSON.stringify(timers));

        this.setState({timers:timers})
    }
    
    deleteSelectedTimer=async(item_list)=>{
        item_list.sort((a,b)=>a-b);
        let timers = this.state.timers;
        timers.forEach((idx)=>{
            timers.splice(idx,1);
        })
        await AsyncStorage.setItem('timers',JSON.stringify(timers));
        this.setState({timers:timers})
    }

    
    render() {
       
    return (
                
            this.state.selectClicked? (
            <View  style={styles.container}>
                <FlatList  style={styles.customTimerList} data={this.state.timers}
                    renderItem={({item}) => 
                    <TouchableOpacity key={item.id} style={styles.customTimerItem}>
                        <Icon size={35} name='checkbox-marked-outline'/>
                        <Text style={styles.customTimerTitle}> {item.title}</Text>
                        
                    </TouchableOpacity>}/>
                    
                      <View style={styles.newBtn}>
                      <Button iconName='plus-circle' color='tomato' size={80} onPress={()=> this.openNewTimerForm()}/>
                      </View></View>
            )
            : (
            <View  style={styles.container}>
                <FlatList  style={styles.customTimerList} data={this.state.timers}
                    renderItem={({item}) => 
                    <TimerItem key={item.id} item={item} navigation={this.props.navigation} deleteTimer={(id)=> this.deleteTimer(item)}/>}/>
                    <View style={styles.newBtn}>
                    <Button iconName='plus-circle' color='tomato' size={80} onPress={()=> this.openNewTimerForm()}/>
                    </View></View>
            )
        );

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    customTimerList: {
        marginTop:15,
        maxHeight:'80%',
        width:'100%',
        flex:1
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