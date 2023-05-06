import {StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('screen').width;

import colors from '../../utils/colors';

export default StyleSheet.create({
    
    /* Container */
    container: {
        flex:1,
        width: screenWidth,
    },
    
    top: {
        flex: 0.2,
        backgroundColor: colors.darkGreen,
        justifyContent:'center',
    },
    middle: {
        flex: 0.7,
        backgroundColor: colors.lightGreen,
        padding: 12,
    },
    bottom: {
        flex: 0.1,
        backgroundColor: colors.darkGreen,
        flexDirection: 'row',
        justifyContent:'space-between',
    },

    /* Typohraphy */
    text: {
        title: {
            color:'white',
            fontSize: 36,
            textAlign: 'center',
        },
        subTitle: {
            color: 'white',
            fontSize: 20,
            textAlign:'center',
        },
        regular: {
            color: 'white',
            fontSize: 28,
            fontWeight: '300',
        },
        warning: {
            color: 'orange',
            fontSize: 14,
            fontWeight: 'bold'
        },
        error: {
            color: 'red',
            fontSize: 14,
            fontWeight: 'bold'
        }
    },

    /* Button */
    button: {
        container: {
            backgroundColor: colors.orange,
            padding: 8,
            minWidth: 150,
            maxWidth: 200,
            margin: 8,
            borderRadius: 4,
            justifyContent:'center',
        },
        label: {
            color: colors.white,
            textAlign:'center',
            fontWeight:'bold',
            fontSize: 18,
        },
    },

    /* Input area */
    inputStyle: {

        container: {
            flex: 1,
        },

        label: {
            color: colors.white,
            fontSize: 15,
        },
        inputArea: {
            backgroundColor:colors.white,
            marginTop: 4,
            borderRadius: 4,
            padding:0
        }
    }



});