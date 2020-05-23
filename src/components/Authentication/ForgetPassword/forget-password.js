import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';

const ForgetPassword = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={styles.description}>Enter your email address. We will send you a verification code.</Text>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email address</Text>
            <TextInput style={CommonStyles.input} />
            <Button title="Send verification code" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => props.navigation.navigate(ScreenName.changePassword)} />
        </View>
    )
}

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    description: {
        marginBottom: 30,
        fontSize: 20,
        color: Colors.ghostWhite
    }
});