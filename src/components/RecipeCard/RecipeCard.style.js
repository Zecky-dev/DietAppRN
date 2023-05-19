import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({
    container: {
        flex:1,
        margin: 12,
    },
    imageContainer: {
        minHeight: 180,
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
        justifyContent:'center',
        flexDirection:'row'
    },

    bottomInfo: {
        flexDirection:'row',
    },

    recipeName: {
        color: colors.warning,
        fontSize: 24,
        fontWeight: 'bold',
    },

    recipeOwner: {
        color: colors.warning,
        fontSize: 16,
        position:'absolute',
        right: 4,
    }

});