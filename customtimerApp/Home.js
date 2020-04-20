
import React, { Component } from 'react';
import { StyleSheet, Text, View,FlatList,Picker, TouchableOpacity,AsyncStorage,Modal,TouchableHighlight, Alert } from 'react-native';

import CustomTimer from './CustomTimer';
import Button from './Button';
import TimePicker from './TimePicker';

//function으로 하니까 안됌...

export default class extends Component{
    
    state={
        page:this.props.page,
        timers:[
            {id:1,title:"타이머1"},{id:2,title:"타이머2"},{id:3,title:"타이머3"},{id:4,title:"타이머4"},{id:5,title:"타이머5"}
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
        // this.openNewTimerForm();
    }
    openNewTimerForm=()=>{

        //         AsyncStorage.setItem('timers',JSON.stringify(this.state.timers));

    }
    render() {
        if(this.state.page==="Home"){
            return (
                <View style={styles.container}>
                <FlatList style={styles.customTimerList} data={this.state.timers}
                  renderItem={({item}) => 
                  <TouchableOpacity  onPress={()=>this.openTiemr(item.id,item.title)}>
                      <Text style={styles.customTimerItem}> {item.title} </Text>
                    </TouchableOpacity>}/>
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
        height:'85%',
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
    newTimerModal:{
        backgroundColor:'white',
        opacity:1, 
        height:'35%',
        marginTop: '100%',
        marginHorizontal:'5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

});