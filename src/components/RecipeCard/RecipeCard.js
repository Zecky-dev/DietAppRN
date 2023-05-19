import React, { useState } from 'react';
import {Image,View,Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './RecipeCard.style';
import colors from '../../utils/colors';

const RecipeCard = ({navigation,recipeData}) => {
    const [isFavorited,setIsFavorited] = useState(false)

    const handleFavorites = () => {
        setIsFavorited(!isFavorited)
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={.5} onPress={() => navigation.navigate('RecipeDetailsScreen')}>
            {/* Image container, contains image of recipe */}
            <View style={styles.imageContainer}>
                <TouchableOpacity style={{justifyContent:'flex-end',alignItems:'flex-end'}} onPress={handleFavorites}>
                    <Icon
                        name={isFavorited?'cards-heart':'cards-heart-outline'}
                        size={48}
                        color={colors.apple}
                    />
                </TouchableOpacity>
                <Image 
                source={{uri:recipeData.recipePhotos[0].uri}} 
                style={styles.image}
                />
            </View>
            
            {/* Info container, contains top info and bottom info */}
            <View style={styles.infoContainer}>
                {/* Recipe name and recipe owner */}
                    <Text style={styles.recipeName}>
                        {recipeData.foodName}
                    </Text>
                    <Text style={styles.recipeOwner}>
                        {recipeData.owner}
                    </Text>                
            </View>
        </TouchableOpacity>
    )
}


export default RecipeCard;