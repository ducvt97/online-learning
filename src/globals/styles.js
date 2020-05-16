import { StyleSheet } from 'react-native';
import Colors from './constants/colors';

const CommonStyles = StyleSheet.create({
    generalContainer: {
        padding: 15,
        marginTop: 25,
    },
    shortMarginVertical: {
        marginVertical: 10
    },
    imageButtonBig: {
        height: 100
    },
    imageButtonSmall: {
        height: 70,
        width: 200
    },
    titleColor: {
        color: Colors.white
    },
    textColor: {
        color: Colors.gainsboro
    },
    fontWeightBold: {
        fontWeight: "bold"
    },
    fontSizeAverage: {
        fontSize: 16
    },
    fontSizeBig: {
        fontSize: 20
    },
    buttonListItem: {
        borderRadius: 15,
        minWidth: 60,
        maxHeight: 30,
        paddingHorizontal: 20,
        backgroundColor: Colors.dimGrey
    }
});

export default CommonStyles;