import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputField from '../InputField/input-field';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import Colors from '../../../globals/constants/colors';

const ForgetPassword = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={styles.description}>Enter your email address. We will send you a verification code.</Text>
            <InputField title="Email address" />
            <Button title="Send verification code" buttonStyle={CommonStyles.shortMarginVertical} />
        </View>
    )
}

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    description: {
        marginBottom: 30,
        fontSize: 20,
        color: Colors.ghostWhite
    }
});