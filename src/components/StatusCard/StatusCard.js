import React from 'react'
import { SafeAreaView, View, Text, Dimensions } from 'react-native'

//styles
import styles from './StatusCard.style'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
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

    return (
        <View>
            <PieChart
                data={data}
                width={350}
                height={220}
                chartConfig={chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                absolute
            />
        </View>
    );
}
