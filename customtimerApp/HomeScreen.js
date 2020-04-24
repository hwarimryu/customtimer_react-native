
import React, { Component } from 'react';
import { StyleSheet, Text, View,FlatList,Picker, TouchableOpacity,AsyncStorage,Modal,TouchableHighlight, Alert } from 'react-native';
import Button from './Button';

//function으로 하니까 안됌...

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
                  <TouchableOpacity 
                       onPress={()=>this.props.navigation.navigate('CustomTimer',{
                           id:item.id,
                            title:item.title,
                       })}>
                      <Text style={styles.customTimerItem}> {item.title} </Text>
                </TouchableOpacity>}/>
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
        justifyContent: 'center',
        alignItems: 'center',
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
        bottom: 25,
    },

});