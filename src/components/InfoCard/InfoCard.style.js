import { StyleSheet,Dimensions } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container:{
        width:Dimensions.get('screen').width/2-16,
        height:Dimensions.get('screen').height/4,
        margin:8,
        borderRadius:8,
        backgroundColor:colors.white
    },
    text:{
        color:colors.darkGreen
    }
})