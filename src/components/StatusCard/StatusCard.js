import React from 'react'
import { SafeAreaView, View, Text, Dimensions } from 'react-native'

//styles
import styles from './StatusCard.style'
import {
    ProgressChart,
} from "react-native-chart-kit";


const data = [
    {
        name: 'Sebze',
        population: 2150,
        color: '#F44336',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Meyve',
        population: 2800,
        color: '#2196F3',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Protein',
        population: 527,
        color: '#FFEB3B',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Tatlı',
        population: 350,
        color: '#4CAF50',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
];

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
    },
};

export default function StatusCard() {

    const data = {
        labels: ["Protein", "Karbonhidrat", "Su"], // optional
        data: [0.01, 0.6, 0.8,0.9],
        colors: [
            "#F00", // Kırmızı
            "#0F0", // Yeşil
            "#00F", // Mavi
          ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#000",
        backgroundGradientTo: "#FFF",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
    };


    return (
        <SafeAreaView style={styles.container}>
                <ProgressChart
                    data={data}
                    width={Dimensions.get('screen').width}
                    height={220}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
        </SafeAreaView>
    )
}
