import { StyleSheet } from 'react-native';
import { Colors } from './constants';

export const CommonStyles = StyleSheet.create({
    // Some style for container
    generalContainer: {
        flex: 1,
        padding: 15
    },
    searchTabContainer: {
        paddingTop: 100
    },
    flex: {
        flex: 1
    },
    // Standard margin verticle for component
    shortMarginVertical: {
        marginVertical: 10
    },
    // Style for text: color, font-weight, font-size
    titleColor: {
        color: Colors.white
    },
    textColor: {
        color: Colors.gainsboro
    },
    fontWeightBold: {
        fontWeight: "bold"
    },
    fontSizeSmall: {
        fontSize: 12
    },
    fontSizeAverage: {
        fontSize: 16
    },
    fontSizeBig: {
        fontSize: 20
    },
    // Style for general header of App
    navigationHeader: {
        backgroundColor: Colors.boldGrey
    },
    // Standard style for input
    input: {
        marginBottom: 5,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
        fontSize: 16,
        borderWidth: 1.2
    },
    // Styles for some button types
    imageButtonBig: {
        height: 120
    },
    imageButtonSmall: {
        height: 70,
        width: 200
    },
    buttonListItem: {
        borderRadius: 15,
        minWidth: 60,
        maxHeight: 34,
        paddingHorizontal: 20,
        backgroundColor: Colors.dimGrey
    },
    // Style for rating component
    rating: {
        marginTop: 5
    },
    // Style for list item's divider component
    divider: {
        marginVertical: 10,
        backgroundColor: Colors.dimGrey
    },
    // Style for validation text
    validationText: {
        color: Colors.red,
        marginBottom: 5
    }
});

// Some style for container
export const containerStyle = {
    generalContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.black
    },
    searchTabContainer: {
        paddingTop: 100
    },
    flex: {
        flex: 1
    }
}

// Style for text: font-weight, font-size (text color is defined in theme-context)
export const textStyles = {
    fontWeightBold: {
        fontWeight: "bold"
    },
    fontSizeSmall: {
        fontSize: 12
    },
    fontSizeAverage: {
        fontSize: 16
    },
    fontSizeBig: {
        fontSize: 20
    }
}