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
        <ScrollView style={{backgroundColor:colors.orange}} showsVerticalScrollIndicator={false}>
            <Button title='Çıkış yap' onPress={() => auth().signOut()}/>
            <StatusCard/>
            <ActivityCard icon={{name: 'cup-water',color:'#75AEDC',size: 48}}/>
            <ActivityCard icon={{name: 'walk',color:'lightblue',size: 48}}/>
            <ActivityCard icon={{name: 'apple',color:'lightblue',size: 48}}/>
            <ActivityCard icon={{name: 'food-variant',color:'lightblue',size: 48}}/>
        </ScrollView>
        )
}
