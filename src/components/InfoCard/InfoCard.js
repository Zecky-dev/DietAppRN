import React from 'react';
import {View,Text,Image} from 'react-native';
import styles from './InfoCard.style';

const InfoCard = ({icon,title,calculateValue}) => {

    const {value,unit} = calculateValue;

    return (
        <View style={styles.container}>
            <Image source={icon} style={{width:48,height:48}}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value} {unit}</Text>
        </View>
    )
}

export default InfoCard;