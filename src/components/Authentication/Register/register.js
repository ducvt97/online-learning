import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { AccountsContext } from '../../../contexts/accounts-context';

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [status, setStatus] = useState(null);

    const {theme} = useContext(ThemeContext);
    const {registerNewAccount} = useContext(AccountsContext);

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
        return shouldDisplay && textInput === "" ? <Text style={CommonStyles.validationText}>{message}</Text>
             : shouldDisplay && message.includes("match") ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderRegisterStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressRegister = (username, email, fullname, password, verifyPassword) => {
        if (username === "" || email === ""  || fullname === ""  || password === ""  || verifyPassword === "" || password !== verifyPassword)
            setShouldDisplayValidationText(true);
        else
            setStatus(registerNewAccount(username, email, fullname, password));
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
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
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showPassword} onChangeText={text => setPassword(text)} />
            <Icon containerStyle={styles.inputIcon} name={showPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowPassword(!showPassword)} />
        </View>
        {renderValidationText(password, shouldDisplayValidationText, "Password cannot be empty")}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify password again</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showVerifyPassword} onChangeText={text => setVerifyPassword(text)} />
            <Icon containerStyle={styles.inputIcon} name={showVerifyPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowVerifyPassword(!showVerifyPassword)} />
        </View>
        {password != "" && verifyPassword != "" && verifyPassword != password
            ? renderValidationText(verifyPassword, shouldDisplayValidationText, password !== verifyPassword ? "Verify password does not match password" : "Verify password cannot be empty")
            : renderValidationText(verifyPassword, shouldDisplayValidationText, "Verify password cannot be empty")}
        {renderRegisterStatus(status)}
        <Button title="Register" buttonStyle={[CommonStyles.shortMarginVertical, styles.button]} onPress={() => onPressRegister(username, email, fullname, password, verifyPassword)} />
    </ScrollView>
}

export default Register;

const styles = StyleSheet.create({
    button: {
        marginBottom: 40
    },
    inputField: {
        flexDirection: "row-reverse",
        alignItems: "center"
    },
    inputIcon: {
        zIndex: 100,
        position: "absolute",
        marginRight: 10
    }
});
