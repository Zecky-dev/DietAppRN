import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
//
import styles from './ProfileScreen.style'
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors'

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';

import InfoCard from '../../components/InfoCard/InfoCard';

const HomeScreen = () => {
    const DesignProfile = () => {

    }

    const DATA = [
        {
            id: '0',
            title: 'First Item',
        },
        {
            id: '1',
            title: 'Second Item',
        },
        {
            id: '2',
            title: 'Third Item',
        },
        {
            id: '3',
            title: 'Fourth Item',
        },
        {
            id: '4',
            title: 'Fifth Item',
        },
        {
            id: '5',
            title: 'Sixth Item',
        },
    ];

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                <View style={styles.top_container}>
                    <View style={styles.top_container_top}>
                        <View style={styles.avatar}>
                            <Avatar
                                rounded
                                size={100}
                                source={{
                                    uri:
                                        'https://mui.com/static/images/avatar/1.jpg',
                                }}
                            />
                        </View>
                        <View style={styles.user}>
                            <Text style={styles.user_text}>İsim soyisim</Text>
                            <Text style={styles.user_text}>Cinsiyet: </Text>
                            <Text style={styles.user_text}>Yaş: </Text>
                        </View>
                    </View>
                    <View style={styles.top_container_bottom}>
                        <TouchableOpacity style={styles.btn} onPress={DesignProfile}>
                            <Text style={styles.btn_text}>Profili Düzenle</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom_container}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        data={DATA}
                        renderItem={({item}) => { return <InfoCard title={item.title}/> }}
                        numColumns={2}
                        ListFooterComponent={<FlatList
                            keyExtractor={item => item.id}
                            data={DATA}
                            renderItem={({item}) => { return <InfoCard title={item.title} additionalStyles={styles.additionalStyles}/> }}
                        />}
                    />
                    
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default HomeScreen;
