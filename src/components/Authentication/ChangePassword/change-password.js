import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import CommonStyles from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { changePassword } from '../../../core/services/authentication-services';

const ChangePassword = (props) => {
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (status && status.status === 200) {
            alert("Password changed successfully!! Please login again.");
            props.navigation.dispatch(
                CommonActions.navigate({
                    name: ScreenName.startScreen
                })
            );
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderChangePasswordStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressChangePassword = (newPassword, verifyNewPassword) => {
        if (newPassword === "" || verifyNewPassword === "")
            setShouldDisplayValidationText(true);
        else
            setStatus(changePassword(newPassword, verifyNewPassword));
    }

    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>New password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry onChangeText={text => setNewPassword(text)} />
            {renderValidationText(newPassword, shouldDisplayValidationText, "New password cannot be empty")}
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify new password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry onChangeText={text => setVerifyNewPassword(text)} />
            {renderValidationText(verifyNewPassword, shouldDisplayValidationText, "Verify new password cannot be empty")}
            {renderChangePasswordStatus(status)}
            <Button title="Change password" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressChangePassword(newPassword, verifyNewPassword)} />
        </View>
    )
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    }
});
