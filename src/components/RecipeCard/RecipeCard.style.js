import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flex:1,
        margin: 12,
        flexDirection: 'column',
    },
    imageContainer: {
        height: 180,
  
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    infoContainer: {
        backgroundColor: 'white',
        padding: 8,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
    },


    topInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },

    bottomInfo: {
        flexDirection:'row',
    },

    recipeName: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },

    recipeDescription: {
        fontSize: 16,
    },


    recipeOwner: {
        color: 'black',
        fontSize: 16,
    }

});