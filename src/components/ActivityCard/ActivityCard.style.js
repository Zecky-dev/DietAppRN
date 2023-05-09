import { StyleSheet } from 'react-native'

import colors from '../../utils/colors'

export default StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        margin:8,
        padding:16,
        borderRadius:20,
        flex:1,
        marginTop:36
    },
    icon:{
        top:-48,
    },
    top:{
        top:-32,
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:8,
    },
    middle:{
        top:-16,
        marginVertical:16,
        alignItems:'center',
    },
    bottom:{
        top:-8,
    },
    text:{
        color:colors.black,
        fontSize:16,
        fontWeight:'500'
    },
    btn:{
        borderRadius:20,
        borderWidth:1,
        borderColor:colors.orange,
        padding:12,
        alignItems:'center',
    }
})