import React from 'react';
import {Image,View,Text, TouchableOpacity} from 'react-native';
import styles from './RecipeCard.style';

const RecipeCard = ({recipeData}) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={.5}>
            {/* Image container, contains image of recipe */}
            <View style={styles.imageContainer}>
                <Image source={{uri:recipeData.imageUrl}} style={styles.image}/>
            </View>
            
            {/* Info container, contains top info and bottom info */}
            <View style={styles.infoContainer}>
                {/* Recipe name and recipe owner */}
                <View style={styles.topInfo}>
                    <Text style={styles.recipeName}>
                        {recipeData.name}
                    </Text>
                    <Text style={styles.recipeOwner}>
                        ~ {recipeData.owner}
                    </Text>
                </View>
                {/* Recipe Description area */}
                <View style={styles.bottomInfo}>
                    <Text style={styles.recipeDescription}>
                        {recipeData.description}
                    </Text>
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RecipeCard;