import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    FAB_style: {
        position: 'absolute',
        top: Dimensions.get('screen').height / 2 + 216,
        right: 16,

    },
    createRecipe: {
        container: {
            flex: 1,
        },
        modal: {
            backgroundColor: colors.white,
            margin: 0,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            marginTop: 64,
            height: Dimensions.get('screen').height
        },
    },
    form:{
        first_layer: {
            padding:8,
        },
        second_layer: {
            flexDirection: 'row',
            marginTop:4
        }
    },
    /* Input area */
    inputStyle: {
        container: {
            flex: 1,
        },

        label: {
            color: colors.black,
            fontWeight: 'bold',
            fontSize: 15,
        },
        inputArea: {
            borderWidth: 1,
            borderColor: colors.darkGreen,
            marginTop: 4,
            borderRadius: 4,
            padding: 0
        }
    }

})