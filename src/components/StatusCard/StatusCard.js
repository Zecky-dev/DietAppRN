import React, { useState } from 'react'
import { SafeAreaView, View, Text, Dimensions } from 'react-native'

//styles
import styles from './StatusCard.style'
import {
    ProgressChart,
} from "react-native-chart-kit";
import colors from '../../utils/colors';


export default function StatusCard() {

    const data = {
        labels: ["Karbonhidrat", "Yağ", "Protein", "Su"].reverse(),
        data: [0.2, 0.4, 0.6, 0.8],
    };

    const color = [
        colors.bread,
        colors.oil,
        colors.meat,
        colors.water,
    ].reverse();

    const chartConfig = {
        backgroundColor: '#E7E7E7',
        backgroundGradientFrom: '#E7E7E7',
        backgroundGradientTo: '#E7E7E7',
        decimalPlaces: 2, // optional, defaults to 2dp
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
        },
        color: (opacity = 1,index = null) => {
            return (
            index
            ?`${color[index]}`.concat(`${Math.round(opacity * 255).toString(16)}`)
            :`${color[0]}`.concat(`${Math.round(opacity * 255).toString(16)}`)
            )
        },

    };


    return (
        <SafeAreaView style={styles.container}>
            <ProgressChart
                data={data}
                width={Dimensions.get('window').width - 32}
                height={220}
                strokeWidth={16}
                radius={24}
                chartConfig={chartConfig}
                hideLegend={false}
                style={{  marginRight: -32 }}
            />
        </SafeAreaView>
    )
}
