import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { register } from '../../../core/services/authentication-services';
import { ThemeContext } from '../../../contexts/theme-context';

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [status, setStatus] = useState(null);

    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        if (status && status.status === 200) {
            alert("You have registered a new account. You can now sign in.");
            props.navigation.dispatch(
                CommonActions.navigate({
                    name: ScreenName.startScreen
                })
            )
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderRegisterStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressRegister = (username, email, fullname, password, verifyPassword) => {
        if (username === "" || email === ""  || fullname === ""  || password === ""  || verifyPassword === "")
            setShouldDisplayValidationText(true);
        else
            setStatus(register(username, email, fullname, password));
    }

    return (
        <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Username</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setUsername(text)} />
            {renderValidationText(username, shouldDisplayValidationText, "Username cannot be empty")}
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email address</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setEmail(text)} />
            {renderValidationText(email, shouldDisplayValidationText, "Email cannot be empty")}
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Full name</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setFullname(text)} />
            {renderValidationText(fullname, shouldDisplayValidationText, "Full name cannot be empty")}
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} secureTextEntry onChangeText={text => setPassword(text)} />
            {renderValidationText(password, shouldDisplayValidationText, "Password cannot be empty")}
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify password again</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} secureTextEntry onChangeText={text => setVerifyPassword(text)} />
            {
                password != "" && verifyPassword != "" && verifyPassword != password
                    ? renderValidationText(verifyPassword, shouldDisplayValidationText, "Verify password does not match password")
                    : renderValidationText(verifyPassword, shouldDisplayValidationText, "Verify password cannot be empty")
            }
            {renderRegisterStatus(status)}
            <Button title="Register" buttonStyle={[CommonStyles.shortMarginVertical, styles.button]} onPress={() => onPressRegister(username, email, fullname, password, verifyPassword)} />
        </ScrollView>
    )
}

export default Register;

const styles = StyleSheet.create({
    button: {
        marginBottom: 40
    }
});
