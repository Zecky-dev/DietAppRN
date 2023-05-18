import React from 'react';
import {View,Text,Image, FlatList} from 'react-native';

import styles from './MealContainerCard.style';
import CustomButton from '../CustomButton/CustomButton';
import colors from '../../utils/colors';
import MealCard from '../MealCard/MealCard';

const MealContainerCard = ({imageSource,label,savedMealList}) => {
  

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={imageSource} style={styles['meal'].image} />
          </View>
          <Text style={styles['meal'].label}>{label}</Text>
          <View>
            <Text style={styles['meal'].calorieValue}>500 kcal</Text>
          </View>
        </View>

        <View style={styles.subContainer}>
          <FlatList
            data={savedMealList}
            keyExtractor={item => item.id}
            renderItem={({item}) => <MealCard meal={item} key={item.id} />}
          />
          <View style={{alignItems: 'center'}}>
            <CustomButton
              onPress={() => {
                console.log('Yemek listesine gidiliyor..');
              }}
              label="Yemek Ekle"
              additionStyles={{
                container: {
                  borderWidth: 2,
                  borderColor: colors.darkGreen,
                  marginTop: 8,
                },
                label: {color: colors.darkGreen},
              }}
            />
          </View>
        </View>
      </View>
    );
}

export default MealContainerCard;