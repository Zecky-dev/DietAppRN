import React from 'react';
import {TouchableOpacity,Text, Dimensions} from 'react-native';

import styles from './CustomButton.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomButton = ({label=null,onPress,additionStyles=null,icon=null,disabled=false}) => {
    
      return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.container, additionStyles?.container]}>
        {icon ? <Icon name={icon.name} color={icon.color} size={icon.size} /> : null}
        {label ? <Text style={[styles.label, additionStyles?.label]}>{label}</Text> : null}
      </TouchableOpacity>
    );
};

export default CustomButton;
