import React from 'react'
import { SafeAreaView,Text,Button } from 'react-native'

// styles
import styles from './HomePage.style'
import colors from '../../utils/colors'

//Cards
import StatusCard from '../../components/StatusCard/StatusCard'
import { ScrollView } from 'react-native'
import ActivityCard from '../../components/ActivityCard/ActivityCard'

//auth
import auth from '@react-native-firebase/auth';

export default function HomePage() {
    return (
        <ScrollView style={{backgroundColor:colors.darkGreen}} showsVerticalScrollIndicator={false}>
            <StatusCard/>
            <ActivityCard icon={{name: 'cup-water',color:colors.water,size: 48}}/>
            <ActivityCard icon={{name: 'food-variant',color:colors.oil,size: 48}}/>
            <ActivityCard icon={{name: 'food-apple',color:colors.apple,size: 48}}/>
            <ActivityCard icon={{name: 'food-turkey',color:colors.meat,size: 48}}/>
            <ActivityCard icon={{name: 'walk',color:colors.bread,size: 48}}/>
        </ScrollView>
        )
}
