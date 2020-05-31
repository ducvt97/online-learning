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
    const [didUsernameFocus, setDidUsernameFocus] = useState(false);
    const [didPasswordFocus, setDidPasswordFocus] = useState(false);

    useEffect(() => {
        if (status && status.status === 200)
            props.navigation.navigate(ScreenName.mainTab);
    }, [status])

    const renderValidationText = (textInput, didFocus, message) => {
        return textInput === "" && didFocus ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderLoginStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressLogin = (username, password) => {
        if (username != "" && password != "")
            setStatus(login(username, password));
    }

    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email or username</Text>
            <TextInput style={CommonStyles.input} onEndEditing={() => setDidUsernameFocus(true)} onChangeText={text => setUsername(text)} />
            {renderValidationText(username, didUsernameFocus, "Username cannot be empty")}
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry onEndEditing={() => setDidPasswordFocus(true)} onChangeText={text => setPassword(text)} />
            {renderValidationText(password, didPasswordFocus, "Password cannot be empty")}
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
