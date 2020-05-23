import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';

const Login = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email or username</Text>
            <TextInput style={CommonStyles.input} />
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry />
            <Button title="Sign in" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => props.navigation.navigate(ScreenName.mainTab)} />
            <Button title="Forget password" type="outline" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => props.navigation.navigate(ScreenName.forgetPassword)} />
            <Button title="Don't have an account? Register now" type="outline" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => props.navigation.navigate(ScreenName.register)} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    }
});
