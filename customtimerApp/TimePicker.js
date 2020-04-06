import React from 'react';
import { Picker, View,Text} from 'react-native';

export default function({onMinuteChange,time}){
    // let pickerItems=''
    // for(let i=0;i<60;i++){
    //     pickerItems+=<Picker.Item label="00" value="" />
    // }


    return(
        <>
        <Picker
        selectedValue={time} 
        style={{ height: 50, width: 50 }}
        onValueChange={(itemValue, itemIndex) => onMinuteChange(itemValue)}>
 
                    <Picker.Item label="00" value="0" />
                    <Picker.Item label="01" value="1" />
                    <Picker.Item label="02" value="2" />
                    <Picker.Item label="03" value="3" />
                    <Picker.Item label="04" value="4" />
                    <Picker.Item label="05" value="5" />
                    <Picker.Item label="06" value="6" />
                    <Picker.Item label="07" value="7" />
                    <Picker.Item label="08" value="8" />
                    <Picker.Item label="09" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="21" value="00" />
                    <Picker.Item label="22" value="00" />
                    <Picker.Item label="23" value="00" />
                    <Picker.Item label="24" value="00" />
                    <Picker.Item label="25" value="00" />
                    <Picker.Item label="26" value="00" />
                    <Picker.Item label="27" value="00" />
                    <Picker.Item label="28" value="00" />
                    <Picker.Item label="29" value="00" />
                    </Picker> 
                    </>
    )
}