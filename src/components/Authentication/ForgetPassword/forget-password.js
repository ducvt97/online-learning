import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputField from '../InputField/input-field';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';

const ForgetPassword = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>Enter your email address. We will send you a verification code.</Text>
            <InputField title="Email address" />
            <Button title="Send verification code" buttonStyle={CommonStyles.shortMarginVertical} />
        </View>
    )
}

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginTop: 80
    },
    description: {
        marginBottom: 30,
        fontSize: 20,
        color: "ghostwhite"
    }
});