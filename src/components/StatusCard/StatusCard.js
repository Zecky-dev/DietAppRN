import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Dimensions } from 'react-native'

//styles

import { ProgressChart } from "react-native-chart-kit";
import colors from '../../utils/colors';


export default function StatusCard({cardData}) {

    const {waterNeed,carbonhydrateNeed,proteinNeed,calorieNeed} = cardData;
    

    const data = {
        labels: ["Karbonhidrat", "Yağ", "Protein", "Su"].reverse(),
        // Buraya oransal olarak her birinden ne kadar harcadığı gelecek
        data: [0, 0, 0, 0.45],
    };

    const color = [
        colors.bread,
        colors.oil,
        colors.meat,
        colors.water,
    ].reverse();

    const chartConfig = {
        backgroundColor: "#F0F0F0",
        backgroundGradientFrom: "#F0F0F0",
      backgroundGradientTo: "#F0F0F0",
        decimalPlaces: 2, // optional, defaults to 2dp
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForLabels: {
            fontWeight: "bold",
        },
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
        <View style={{borderColor:colors.black,borderBottomWidth:0.4}}>
            <ProgressChart
                data={data}
                width={Dimensions.get('screen').width - 32}
                height={200}
                strokeWidth={12}
                radius={24}
                chartConfig={chartConfig}
                hideLegend={false}
                style={{  marginRight: -32 }}
            />
        </View>
    )
}
