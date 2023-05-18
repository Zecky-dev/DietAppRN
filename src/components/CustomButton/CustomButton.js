import React from 'react';
import {TouchableOpacity,Text} from 'react-native';

import styles from './CustomButton.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native';
import colors from '../../utils/colors';

const CustomButton = ({label=null,onPress,additionStyles=null,icon=null,disabled=false,loading=false}) => {
    
      if(loading) {
        return (
          <TouchableOpacity
            disabled
            style={[styles.container, additionStyles?.container,{justifyContent:'center'}]}>
            <ActivityIndicator color={colors.white}/>
          </TouchableOpacity>
        );
      }

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
