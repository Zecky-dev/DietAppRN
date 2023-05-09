import React from 'react'
import { SafeAreaView, View, Text, Dimensions } from 'react-native'

//styles
import styles from './StatusCard.style'
import {
    ProgressChart,
} from "react-native-chart-kit";

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
                    height={200}
                    strokeWidth={12}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
        </SafeAreaView>
    )
}
