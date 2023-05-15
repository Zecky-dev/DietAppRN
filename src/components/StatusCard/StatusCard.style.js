import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    sub_container:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    text:{
        color:colors.white,
        fontWeight:'500',
        fontSize:20,
    }
})