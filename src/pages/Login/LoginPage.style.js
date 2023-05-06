import {StyleSheet} from 'react-native';

import colors from '../../utils/colors';

export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.white,
    },
    imageBackground: {
        flex:1,
        resizeMode:'cover',
        justifyContent:'center',
    },
    content: {
        height: '75%',
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 12,
        backgroundColor:colors.darkGreen,
        justifyContent:'center',
    },

   
    titleContainer: {
        flex: 0.2,
        alignItems:'center',
        justifyContent:'center',
    },

    loginContainer: {
        flex: 0.8,
        justifyContent:'flex-start',
    },

    input: {
        backgroundColor:'white',
        borderRadius: 4,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: colors.black,
        padding: 12,
    },

    actionTitle: {
        fontSize: 36,
        color: colors.white,
        fontWeight: 'bold',
    },

    appTitle: {
        position: 'absolute',
        right:0,
        left:0,
        textAlign:'center',
        top: '11%',
        color: colors.darkGreen,
        fontSize: 36,
        fontWeight: '300'
    },  

    buttonContainer: {
        flexDirection:'row',
        marginTop: 12,
    },

    title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
  },
});