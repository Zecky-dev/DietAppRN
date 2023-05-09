import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.darkGreen,
    },
    sub_container:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        marginVertical: 32
    },
    text:{
        color:colors.white,
        fontWeight:'500',
        fontSize:20,
    }
})