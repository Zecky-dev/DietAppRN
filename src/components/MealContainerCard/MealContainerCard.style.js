import {StyleSheet,Dimensions} from 'react-native';
import { colors } from 'react-native-elements';


export default StyleSheet.create({
    container: {
        flex:0,
        width: Dimensions.get('screen').width - 24,
        margin:12,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
    },
    topContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:12,
        borderBottomWidth:0.5,
        borderBottomColor: colors.black,
        paddingBottom: 8,
    },  
    meal: {
        label: {
            color: 'black',
            fontSize: 24,
            marginLeft:16,
        },
        image: {
            width: 48,
            height: 48,
            
        }
    }
})