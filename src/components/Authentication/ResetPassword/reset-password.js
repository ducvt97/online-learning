import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';
import { LanguageContext } from '../../../contexts/language-context';

const ResetPassword = (props) => {
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    useEffect(() => {
        // Check if user reset password success, navigate to start screen
        if (status && status.status === 200) {
            alert(langContext.state.translation["resetPassSuccessMsg"]);
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
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["newPass"]}</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showNewPassword} onChangeText={text => setNewPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showNewPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowNewPassword(!showNewPassword)} />
        </View>
        {renderValidationText(newPassword, shouldDisplayValidationText, `${langContext.state.translation["newPass"]} ${langContext.state.translation["validationText"]}`)}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["verify"]} {langContext.state.translation["newPass"]}</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showVerifyPassword} onChangeText={text => setVerifyNewPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showVerifyPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowVerifyPassword(!showVerifyPassword)} />
        </View>
        {renderValidationText(verifyNewPassword, shouldDisplayValidationText, newPassword !== verifyNewPassword ?
            langContext.state.translation["verifyPassValidationText"] : `${langContext.state.translation["verify"]} ${langContext.state.translation["newPass"]} ${langContext.state.translation["validationText"]}`)}
        {renderResetPasswordStatus(status)}
        <Button title={langContext.state.translation["resetPass"]} loading={isLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressResetPassword(newPassword, verifyNewPassword, props.route.params.userId)} />
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