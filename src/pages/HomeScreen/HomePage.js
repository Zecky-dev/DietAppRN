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
        {
            id: 0,
            icon: {
                name: 'cup-water',
                color: colors.water,
                size: 48
            },
            label:"Su Aktivitesi"
        },
        {
            id: 1,
            icon: {
                name: 'food-variant',
                color: colors.oil,
                size: 48
            },
            label:"Kahvaltı Aktivitesi"
        },
        {
            id: 2,
            icon: {
                name: 'food-apple',
                color: colors.apple,
                size: 48
            },
            label:"Meyve - Sebze Aktivitesi"
        },
        {
            id: 3,
            icon: {
                name: 'food-turkey',
                color: colors.meat,
                size: 48
            },
            label:"Akşam Yemeği Aktivitesi"
        },
        {
            id: 4,
            icon: {
                name: 'walk',
                color: colors.bread,
                size: 48
            },
            label:"Yürüyüş - Koşu Aktivitesi"
        }
    ];

    return (
        <View style={{ backgroundColor: '#E7E7E7' }} showsVerticalScrollIndicator={false}>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={DATA}
                renderItem={({ item }) => { return <ActivityCard icon={item.icon} label={item.label}/> }}
                ListHeaderComponent={<StatusCard />}
            />
            {/* onpress methodu id ile switch case mantığı olarak toplu verilebilir. */}
        </View>
    )
}
