import React from 'react'
import { View, Text } from 'react-native'
import styles from './InfoCard.style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InfoCard = ({title,additionalStyles=null}) => {
    return (
        <View style={[styles.container,additionalStyles?.container]}>
            <Text style={styles.text}>
                {title}
            </Text>
        </View>
    )
}

export default InfoCard;