import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function Button({iconName, onPress,size,color}){
    return(
        <TouchableOpacity onPressOut={onPress}>
            <Icon name={iconName} size={size} color={color}/>
        </TouchableOpacity>
    )
}

// Button.protoTypes={
//     iconName:PropTypes.string.isRequired,
//     onPress:PropTypes.func.isRequired
// }
export default Button;

// repeat

// bell-slash bell-slash-o


// {
//     isCounting: true|false ,
//     counterDuration:1500,
//     elapsedTime:0,//시작한 지 얼마나 지낫나
// }
