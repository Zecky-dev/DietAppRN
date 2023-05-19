import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

//Styles
import styles from './ActivityCard.style'
import colors from '../../utils/colors'

//Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//progress
import ProgressBar from 'react-native-progress/Bar'

export default function ActivityCard({ additionStyles = null, icon,label,dailyNeedValue }) {

    const { name, color, size } = icon;

    return (
        <View style={[styles.container, additionStyles?.container]}>
            <View style={[styles.icon,additionStyles?.icon]}>
                <Icon name={name} color={color} size={size} />
            </View>
            {/*
                <View style={[styles.top,additionStyles?.top]}>
                <Text style={styles.text}>Gösterge/{dailyNeedValue}</Text>
                <Text style={styles.text}>%dilim</Text>
                </View>
            */}
            <View style={[styles.middle,additionStyles?.middle]}>
                <ProgressBar progress={0.05} height={32} width={330} color={colors.orange}/>
            </View>
            <View style={[styles.bottom,additionStyles?.bottom]}>
                <TouchableOpacity style={styles.btn}><Text style={styles.text}>{label}</Text></TouchableOpacity>
            </View>
        </View>
    )
}