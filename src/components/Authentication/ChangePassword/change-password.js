import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';
import { AccountsContext } from '../../../contexts/accounts-context';

const ChangePassword = (props) => {
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [status, setStatus] = useState(null);

    const {authentication, setAuthenticated, setUser} = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);
    const {getAccountByUsernameOrEmail, changeAccountPassword} = useContext(AccountsContext);

    useEffect(() => {
        if (status && status.status === 200) {
            alert("Password changed successfully!! Please login again.");
            setAuthenticated(false);
            setUser(null);
            props.navigation.dispatch(CommonActions.navigate({ name: ScreenName.startScreen }));
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return shouldDisplay && textInput === "" ? <Text style={CommonStyles.validationText}>{message}</Text>
             : shouldDisplay && message.includes("match") ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderChangePasswordStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressChangePassword = (newPassword, verifyNewPassword) => {
        if (newPassword === "" || verifyNewPassword === "" || newPassword !== verifyNewPassword)
            setShouldDisplayValidationText(true);
        else {
            if (authentication.authenticated) {
                setStatus(changeAccountPassword(authentication.user.id, newPassword));
            } else {
                const account = getAccountByUsernameOrEmail(props.route.params.email);
                setStatus(changeAccountPassword(account.id, newPassword));
            }
        } 
    }

    return <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>New password</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} secureTextEntry onChangeText={text => setNewPassword(text)} />
        {renderValidationText(newPassword, shouldDisplayValidationText, "New password cannot be empty")}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify new password</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} secureTextEntry onChangeText={text => setVerifyNewPassword(text)} />
        {renderValidationText(verifyNewPassword, shouldDisplayValidationText, newPassword !== verifyNewPassword ? "Verify new password must match new password" : "Verify new password cannot be empty")}
        {renderChangePasswordStatus(status)}
        <Button title="Change password" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressChangePassword(newPassword, verifyNewPassword)} />
    </View>
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    }
});
