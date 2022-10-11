import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        justifyContent: 'center'
      },
    
    title: {
        fontSize: 40,
        marginLeft: 100,
        textDecorationLine: 'underline',
    },

    dices: {
        flexDirection: 'row'
    },

    dice: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 6,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: 'black',
    },

    reset: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: 'grey',
    },

    buttontext: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    info: {
        alignItems:'center'
    },

    gameinfo: {
        fontSize: 25,
        padding: 5,
    },

    gamestatus: {
        fontSize: 23,
        color: '#524b4b',
    },

    points: {
        fontSize: 20,
        marginLeft: 20
    }
});