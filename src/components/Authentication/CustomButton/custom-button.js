import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  } from 'react-native';

const CustomButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, props.isNormal ? styles.buttonNormal : styles.buttonTransparent]}>
                <Text style={[styles.title, props.isNormal ? styles.white : styles.blue]}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    button: {
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    buttonNormal: {
        backgroundColor: "dodgerblue"
    },
    buttonTransparent: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "deepskyblue"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    white: {
        color: "white"
    },
    blue: {
        color: "deepskyblue"
    }
});