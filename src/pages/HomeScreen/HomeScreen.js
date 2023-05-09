import React from 'react';
import {View,Text, Button} from 'react-native';


import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    return (
        <View>
            <Text>
                Home
            </Text>
            <Button title='Çıkış yap' onPress={() => auth().signOut()}/>
        </View>
    )
}

export default HomeScreen;
