import { StyleSheet, Dimensions } from "react-native";
import colors from '../../utils/colors';
const width = Dimensions.get('window').width;


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width,
        backgroundColor:'#303030'
    },
    top: {
        flex: 0.2,
        backgroundColor: colors.darkGreen,
        justifyContent:'center',
    },
    middle: {
        flex: 0.7,
        backgroundColor: colors.white,
        padding: 12,
    },
    bottom: {
        flex: 0.1,
        backgroundColor: colors.darkGreen,
        flexDirection: 'row',
        justifyContent:'space-between',
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },

    /* Typohraphy */
    text: {
        title: {
            color:colors.white,
            fontSize: 36,
            textAlign: 'center',
        },
        subTitle: {
            color: colors.white,
            fontSize: 20,
            textAlign:'center',
        },
        regular: {
            color: colors.black,
            fontSize: 26,
            fontWeight: '400',
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
            color: colors.black,
            fontWeight:'bold',
            fontSize: 15,
        },
        inputArea: {
            borderWidth: 1,
            borderColor: colors.darkGreen,
            marginTop: 4,
            borderRadius: 4,
            padding:0
        }
    }
});