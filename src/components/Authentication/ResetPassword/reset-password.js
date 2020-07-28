import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';

const ResetPassword = (props) => {
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        if (status && status.status === 200) {
            alert("Reset password successfully. Now you can login with your new password.");
            props.navigation.navigate(ScreenName.startScreen);
        }
    }, [status])

    const renderValidationText = (textInput, didFocus, message) => {
        return textInput === "" && didFocus ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderResetPasswordStatus = (status) => {
        return status ? <Text style={CommonStyles.validationText}>{status.message}</Text> : null;
    }

    const onPressResetPassword = (newPassword, verifyNewPassword, userId) => {
        if (newPassword === "" || verifyNewPassword === "" || newPassword !== verifyNewPassword)
            setShouldDisplayValidationText(true);
        else {
            setIsLoading(true);
            UserServices.resetPassword(userId, newPassword)
                .then(response => {
                    setIsLoading(false);
                    setStatus({status: response.status, message: response.data.message});
                })
                .catch(error => {
                    UserServices.handleError(error);
                    setStatus({ status: 503, message: error.message });
                });
        }
    }

    return <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>New password</Text>
            <View style={styles.inputField}>
                <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showNewPassword} onChangeText={text => setNewPassword(text)} />
                <Icon containerStyle={CommonStyles.inputIcon} name={showNewPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowNewPassword(!showNewPassword)} />
            </View>
            {renderValidationText(newPassword, shouldDisplayValidationText, "New password cannot be empty")}
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify new password</Text>
            <View style={styles.inputField}>
                <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showVerifyPassword} onChangeText={text => setVerifyNewPassword(text)} />
                <Icon containerStyle={CommonStyles.inputIcon} name={showVerifyPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowVerifyPassword(!showVerifyPassword)} />
            </View>
            {renderValidationText(verifyNewPassword, shouldDisplayValidationText, newPassword !== verifyNewPassword ? "Verify new password must match new password" : "Verify new password cannot be empty")}
            {renderResetPasswordStatus(status)}
            <Button title="Reset password" loading={isLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressResetPassword(newPassword, verifyNewPassword, props.route.params.userId)} />
        </View>
}

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    description: {
        marginBottom: 30,
        fontSize: 20,
    },
    inputField: {
        flexDirection: "row-reverse",
        alignItems: "center"
    }
});