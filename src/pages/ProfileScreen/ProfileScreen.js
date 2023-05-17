import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, FlatList, ScrollView, ActivityIndicator } from 'react-native';
//
import styles from './ProfileScreen.style'

//functions
import {
    calculateBMI,
    calculateIdealWeight,
    calculateWeightToBeLost,
    calculateWeightToBeGained,
    calculateBodySurfaceArea,
    calculateMinMaxWeight
}
    from '../../utils/functions'

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { Avatar } from 'react-native-elements';

import colors from '../../utils/colors';

import InfoCard from '../../components/InfoCard/InfoCard';
import AnimatedLottieView from 'lottie-react-native';
import CustomButton from '../../components/CustomButton/CustomButton';

const ProfileScreen = ({navigation}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const username = auth().currentUser.email.split('@')[0];
        const getUser = async () => {
            const user = await firestore().collection('Users').doc(username).get();
            setUser(user._data);
        }
        getUser();
    }, [user]);

    if (user) {

        const DATA = [
            {
                id: '0',
                title: 'Vücut Kitle Indeksiniz',
                value: calculateBMI(user),
                icon: require('../../assets/icons/weighing.png'),
            },
            {
                id: '1',
                title: 'İdeal Kilonuz',
                value: calculateIdealWeight(user),
                icon: require('../../assets/icons/ideal.png')
            },
            {
                id: '2',
                title: 'Vücut Yüzey Alanınız',
                value: calculateBodySurfaceArea(user),
                icon: require('../../assets/icons/surfacearea.png')
            },
            {
                id: '3',
                title: 'Sağlıklı Kilo aralığı',
                value: calculateMinMaxWeight(user),
                icon: require('../../assets/icons/healthy.png')
            },
            {
                id: '4',
                title: 'Vermeniz Gereken Kilo',
                value: calculateWeightToBeLost(user),
                icon: require('../../assets/icons/exercise.png')
            },
            {
                id: '5',
                title: 'Almanız Gereken Kilo',
                value: calculateWeightToBeGained(user),
                icon: require('../../assets/icons/eating.png')
            }

        ];

        return (
          <View style={styles.container}>
            <View style={styles.top_container}>
              <View style={styles.top_container_top}>
                <View style={styles.avatar}>
                  <Avatar
                    rounded
                    size={100}
                    source={{
                      uri: 'https://mui.com/static/images/avatar/1.jpg',
                    }}
                  />
                </View>
                <View style={styles.user}>
                  <Text style={styles.user_text}>
                    {user.name} {user.surname}
                  </Text>
                  <Text style={styles.user_text}>
                    {user.gender === null || user.gender === 'Erkek'
                      ? 'Erkek'
                      : 'Kadın'}
                  </Text>
                  <Text style={styles.user_text}>{user.age} yaşında</Text>
                </View>
              </View>
              <View style={styles.top_container_bottom}>
                <CustomButton
                  label="Düzenle"
                  icon={{
                    name: 'account-edit',
                    color: colors.darkGreen,
                    size: 24,
                  }}
                  onPress={() => navigation.navigate('ProfileEditScreen')}
                  additionStyles={{
                    container: {
                      backgroundColor: colors.white,
                      flex: 0.45,
                      alignItems: 'center',
                    },
                    label: {color: colors.darkGreen},
                  }}
                />

                <CustomButton
                  label="Çıkış Yap"
                  icon={{name: 'logout', color: colors.darkGreen, size: 24}}
                  onPress={() => auth().signOut()}
                  additionStyles={{
                    container: {
                      backgroundColor: colors.white,
                      flex: 0.45,
                      alignItems: 'center',
                    },
                    label: {color: colors.darkGreen},
                  }}
                />
            </View>
            </View>
            <View style={styles.bottom_container}>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={DATA}
                renderItem={({item}) => {
                  return (
                    <InfoCard
                      title={item.title}
                      icon={item.icon}
                      calculateValue={item.value}
                    />
                  );
                }}
                numColumns={2}
              />
            </View>
          </View>
        );
    }
    else {
        return( 
        <AnimatedLottieView 
            source={require('../../assets/animations/intro_loading.json')}
            autoPlay
        />)
    }
}

export default ProfileScreen;
