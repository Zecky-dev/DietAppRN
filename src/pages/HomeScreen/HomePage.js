import React,{useEffect,useState} from 'react'
import { View, FlatList, ScrollView } from 'react-native'

// styles
import styles from './HomePage.style'
import colors from '../../utils/colors'

//Cards
import StatusCard from '../../components/StatusCard/StatusCard'
import ActivityCard from '../../components/ActivityCard/ActivityCard'

import ActivityCard2 from '../../components/ActivityCard2/ActivityCard2'
import MealContainerCard from '../../components/MealContainerCard/MealContainerCard';


// auth and firestore
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// lottie
import Lottie from 'lottie-react-native';
import { calculateDailyCalorieNeed, calculateDailyCarbohydrateNeed, calculateDailyProteinNeed, calculateDailyWaterNeed} from '../../utils/functions'


export default function HomePage() {

    const [userData,setUserData] = useState(null);
    useEffect(() => {
        const username = auth().currentUser.email.split('@')[0];
        const getUserData = async() => {
            const userData = (await firestore().collection("Users").doc(username).get()).data();
            setUserData(userData);
        }
        getUserData();
    },[])


    if(userData) {
        
        const cardData = {
          calorieNeed: calculateDailyCalorieNeed(userData),
          carbonhydrateNeed: calculateDailyCarbohydrateNeed(userData),
          proteinNeed: calculateDailyProteinNeed(userData),
          waterNeed: calculateDailyWaterNeed(userData)
        };
        
        const DATA = [
            {
                id: 0,
                icon: {
                    name: 'cup-water',
                    color: colors.water,
                    size: 48
                },
                label:"Su Aktivitesi",
                dailyNeedValue: cardData.waterNeed,
            },
            {
                id: 1,
                icon: {
                    name: 'food-variant',
                    color: colors.oil,
                    size: 48
                },
                label:"Kahvaltı Aktivitesi",
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

        const mealLists = [
            {
                savedMeals: [
                    {
                        id: 0,
                        name: "Tost",
                        imageURL: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/02/salcali-tost-elif-sunum.jpg',
                        amount: 1,
                        calorie: 212
                    },
                    {
                        id: 1,
                        name: "Tost",
                        imageURL: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/02/salcali-tost-elif-sunum.jpg',
                        amount: 1,
                        calorie: 212
                    },
                ],
                label: "Kahvaltı",
                imageSource: require('../../assets/icons/breakfast.png'),
            },
            {
                savedMeals: [
                    {
                        id: 0,
                        name: "Tost",
                        imageURL: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/02/salcali-tost-elif-sunum.jpg',
                        amount: 1,
                        calorie: 212
                    },
                    {
                        id: 1,
                        name: "Tost",
                        imageURL: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/02/salcali-tost-elif-sunum.jpg',
                        amount: 1,
                        calorie: 212
                    },
                ],
                label: "Öğle Yemeği",
                imageSource: require('../../assets/icons/lunch.png'),
            },

            {
                savedMeals: [
                    {
                        id: 0,
                        name: "Tost",
                        imageURL: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/02/salcali-tost-elif-sunum.jpg',
                        amount: 1,
                        calorie: 212
                    },
                    {
                        id: 1,
                        name: "Tost",
                        imageURL: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2023/02/salcali-tost-elif-sunum.jpg',
                        amount: 1,
                        calorie: 212
                    },
                ],
                label: "Akşam Yemeği",
                imageSource: require('../../assets/icons/dinner.png'),
            },   
        ]


        const mealImages = {
            lunch: require('../../assets/icons/lunch.png'),
        }

                
        return (
            <View style={{ flex:1,backgroundColor: colors.meat }}>
                <StatusCard cardData={cardData}/>
                <FlatList
                    data={mealLists}
                    renderItem={({item}) => <MealContainerCard imageSource={item.imageSource} label={item.label} savedMealList={item.savedMeals} /> }
                />                
            </View>
        )
    }
    else {
        return <Lottie source={require('../../assets/animations/intro_loading.json')}/>
    }


    
}
