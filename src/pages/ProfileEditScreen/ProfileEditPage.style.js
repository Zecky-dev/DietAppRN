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
    },
    middle: {
        flex: 4,
        backgroundColor: '#E7E7E7',
        padding: 12,
        
    },
    btn_container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#E7E7E7'
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
    }
})