import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
//
import styles from './ProfileScreen.style'
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors'


import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';

import InfoCard2 from '../../components/InfoCard2/InfoCard2';

const ProfileScreen = () => {

    const [user,setUser] = useState();



    useEffect(() => {
        const username = auth().currentUser.email.split('@')[0];
        const getUser = async () => {
            const user = await firestore().collection('Users').doc(username).get();
            setUser(user._data);
        }
        getUser();        
    },[user]);


    // Vücut kitle indexi
    const calculateBMI = (user) => {
        // Kilo / Boy^2 = BMI
        const heightMeterSquare = Math.pow(user.height / 10,2);
        const BMI = (user.weight / heightMeterSquare).toFixed(2);
        let BMIDescr = "";
        if(BMI < 18.5) {
            BMIDescr = "Zayıf";
        }
        else if(BMI >= 18.5 && BMI < 24.9) {
            BMIDescr = "Normal Kilolu"
        }
        else if(BMI >= 25 && BMI < 29.9) {
            BMIDescr = "Fazla Kilolu"
        }
        else if(BMI>= 30 && BMI  < 34.9) {
            BMIDescr = "1. Derece Obez"
        } 
        else if(BMI>= 35 && BMI < 39.9) {
            BMIDescr = "2. Derece Obez"
        }
        else {
            BMIDescr = "3. Derece Obez"
        }
        return {value: BMI, unit: "kg/m²",BMIDescr};
    }

    // İdeal kilo hesabı
    const calculateIdealWeight = (user) => {
        const {height,gender} = user;
        if(gender === null || gender === "Erkek") {
            return {unit: "kg", value: (50 + 2.3 * ((height/2.54)-60)).toFixed(2)};
        }
        else {
            return {unit: "kg", value: (45 + 2.3 * ((height/2.54)-60)).toFixed(2)};
        }
    }

    // Verilmesi veya alınması gereken kilo
    const calculateDesiredWeight = (user) => {
        if(user.weight > calculateIdealWeight(user)) {
            return { type: "lose", unit: "kg" , value: (user.weight - calculateIdealWeight).toFixed(2)};
        }
        else {
            return {type: "gain", unit: "kg" , value : (calculateIdealWeight(user) - user.weight).toFixed(2)};
        }
    }

    // Vücut yüzey alanı hesaplama
    const calculateBodySurfaceArea = (user) => {
        const {height,weight} = user;
        return {value: Math.sqrt((height * weight) / 3600), unit: "m^2"};
    }

    // Sağlıklı kilo aralığı hesaplama
    const minMaxWeightCalculate = (user) => {
        const {height,weight} = user;
        const min = 18.5 * Math.pow(height/100,2);
        const max = 24.9 * Math.pow(height/100,2);
        return {min,max}
    }


    

    if(user) {

        const DATA = [
            {
                id: '0',
                title: 'Vücut Kitle Indexiniz',
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
                                    uri:
                                        'https://mui.com/static/images/avatar/1.jpg',
                                }}
                            />
                        </View>
                        <View style={styles.user}>
                            <Text style={styles.user_text}>{user.name} {user.surname}</Text>
                            <Text style={styles.user_text}>{user.gender === null || user.gender === "Erkek" ? "Erkek" : "Kadın"}</Text>
                            <Text style={styles.user_text}>{user.age} yaşında</Text>
                        </View>
                    </View>
                    <View style={styles.top_container_bottom}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btn_text}>Profili Düzenle</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom_container}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        data={DATA}
                        renderItem={({item}) => { return <InfoCard2 title={item.title} icon={item.icon} calculateValue={item.value}/> }}
                        numColumns={2}
                    />
                
                </View>
            </View>
        )
    }
    else {
        return <View><Text>Loading</Text></View>
    }
}

export default ProfileScreen;
