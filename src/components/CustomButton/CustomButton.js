import React from 'react';
import {TouchableOpacity,Text} from 'react-native';

import styles from './CustomButton.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomButton = ({label=null,onPress,additionStyles=null,icon=null}) => {
    
    const {name,color,size} = icon;
    
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, additionStyles?.container]}>
        {icon ? <Icon name={name} color={color} size={size} /> : null}
        {label ? <Text style={[styles.label, additionStyles?.label]}>{label}</Text> : null}
      </TouchableOpacity>
    );
};

export default CustomButton;
