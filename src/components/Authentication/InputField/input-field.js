import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const InputField = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput style={styles.input} secureTextEntry={props.isPassword}></TextInput>
        </View>
    )
}

export default InputField;

const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },
    title: {
        marginBottom: 8,
        color: "gainsboro",
        fontSize: 16
    },
    input: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: "gainsboro",
        fontSize: 16
    }
});