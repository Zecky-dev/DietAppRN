import { Dimensions, StyleSheet } from 'react-native'
import colors from '../../utils/colors';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    top_container: {
        flex: 1,
        backgroundColor:colors.darkGreen
    },
    top_container_top: {
        flex:2,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    avatar: {

    },
    user: {
        
    },
    user_text:{
        color: colors.white,
        fontWeight:'500',
    },
    top_container_bottom: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btn:{
        borderColor:colors.white,
        borderWidth:1,
        paddingVertical:8,
        paddingHorizontal:72,
        borderRadius:8,
        backgroundColor:colors.white,
    },
    btn_text:{
        color: colors.darkGreen,
        fontWeight:'500',
    },
    bottom_container: {
        flex:3,
        backgroundColor:'#EBEBEB',
    },
    list:{

    },
    additionalStyles: {
        container: {
            width: Dimensions.get('screen').width-16,
        }
    },
});