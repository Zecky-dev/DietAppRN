import React from 'react';
import {Image,Text,View,TouchableOpacity, Alert} from 'react-native';

import styles from './MealCard.style';

const MealCard = ({meal}) => {
    const {imageURL,name,amount,calorie} = meal;
    return (
        <TouchableOpacity style={styles.container} activeOpacity={.7} onLongPress={() => Alert.alert("Test","Test")}>

            <View style={{borderRadius:16}}>
                <Image source={{uri: imageURL}} style={styles['food'].image}/>
            </View>
            
            <View style={styles.midContainer}>
                <Text style={styles['food'].name}>
                    {name}
                </Text>
                <Text style={styles['food'].amount}>
                    {amount} adet
                </Text>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles['food'].calorieValue}>
                    {calorie} kcal
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default MealCard;