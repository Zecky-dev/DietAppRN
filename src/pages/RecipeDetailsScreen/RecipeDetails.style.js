import { Dimensions,StyleSheet } from "react-native";
import colors from "../../utils/colors";

export default StyleSheet.create({
    container:{
        flex:1
    },
    imageContainer: {
        minHeight:300,
    },
    imageStyle: {
        minWidth:Dimensions.get('screen').width
    },
    
    textContainer:{
        flex:1,
    },
    top:{
        flex:1,
    },
    bottom:{
        flex:8,
        backgroundColor:colors.darkGreen
    },
    text: {
        headerText: {
            fontSize: 24,
            fontWeight: '500',
            color: colors.warning
        },  
        descText:{

        },
        signText:{
            fontSize: 16,
            fontWeight: '500',
            color: colors.black
        },
        signTextW:{
            fontSize: 16,
            fontWeight: '500',
            color: colors.white
        }
    },
})