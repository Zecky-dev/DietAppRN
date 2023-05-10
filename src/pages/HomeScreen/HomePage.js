import React from 'react'
import { View, FlatList } from 'react-native'

// styles
import styles from './HomePage.style'
import colors from '../../utils/colors'

//Cards
import StatusCard from '../../components/StatusCard/StatusCard'
import ActivityCard from '../../components/ActivityCard/ActivityCard'

//auth
import auth from '@react-native-firebase/auth';

export default function HomePage() {
    const DATA = [
        {id:0,name: 'cup-water',color:colors.water,size: 48},
        {id:1,name: 'food-variant',color:colors.oil,size: 48},
        {id:2,name: 'food-apple',color:colors.apple,size: 48},
        {id:3,name: 'food-turkey',color:colors.meat,size: 48},
        {id:4,name: 'walk',color:colors.bread,size: 48}
    ];

    return (
        <View style={{backgroundColor:'#E7E7E7'}} showsVerticalScrollIndicator={false}>
            <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={DATA}
            renderItem={({item})=>{return <ActivityCard icon={item}/>}}
            ListHeaderComponent={<StatusCard/>}
            />
            {/* onpress methodu id ile switch case mantığı olarak toplu verilebilir. */}
        </View>
        )
}
