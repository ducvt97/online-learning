import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { login } from '../../../core/services/authentication-services';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);

    useEffect(() => {
        if (status && status.status === 200)
            props.navigation.navigate(ScreenName.mainTab, {
                screen: ScreenName.homeTab
            });
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderLoginStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressLogin = (username, password) => {
        if (username != "" && password != "")
            setStatus(login(username, password));
        else
            setShouldDisplayValidationText(true);
    }

    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email or username</Text>
            <TextInput style={CommonStyles.input} onChangeText={text => setUsername(text)} />
            {renderValidationText(username, shouldDisplayValidationText, "Username cannot be empty")}
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry onChangeText={text => setPassword(text)} />
            {renderValidationText(password, shouldDisplayValidationText, "Password cannot be empty")}
            {renderLoginStatus(status)}
            <Button title="Sign in" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressLogin(username, password)} />
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
