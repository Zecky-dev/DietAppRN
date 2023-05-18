import {StyleSheet,Dimensions} from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
    container: {
        width:Dimensions.get('screen').width/2-16,
        height:Dimensions.get('screen').height/4,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white,
        padding: 8,
        margin: 8,
        borderRadius: 4,
    },
    title: {
        
        color: colors.darkGreen,
        fontSize: 18,
        textAlign:'center',
    },
    value: {
        color: colors.darkGreen,
        fontSize: 16,
    }
});