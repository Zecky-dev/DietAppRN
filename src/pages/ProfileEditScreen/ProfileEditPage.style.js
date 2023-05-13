import { StyleSheet, Dimensions } from "react-native";
import colors from '../../utils/colors';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
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
            padding:0,
            backgroundColor: colors.white
        }
    },
    container: {
        flex: 1,
        backgroundColor: colors.gray,
    },
    middle: {
        flex: 4,
        padding: 12,
        
    },
    btn_container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        width:192,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:colors.darkGreen,
        padding:16,
    },
    btn_text: {
        color:colors.white,
        fontWeight:'500'
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
})