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

export default function StatusCard() {

    const data = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [0.4, 0.6, 0.8],
        colors: [
            "#F00", // Kırmızı
            "#0F0", // Yeşil
            "#00F", // Mavi
          ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#FFF",
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
