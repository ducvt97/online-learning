import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';
import { LanguageContext } from '../../../contexts/language-context';

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const authContext = useContext(AuthenticationContext);
    const langContext = useContext(LanguageContext);
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        if (status && status.status === 200) {
            authContext.logout();
            alert(langContext.state.translation["changePassSuccessMsg"]);
            props.navigation.dispatch(CommonActions.navigate({ name: ScreenName.startScreen }));
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return shouldDisplay && textInput === "" ? <Text style={CommonStyles.validationText}>{message}</Text>
            : shouldDisplay && (message.includes("match") || message.includes("giống")) ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderChangePasswordStatus = (status) => {
        return status ? <Text style={[CommonStyles.validationText, CommonStyles.shortMarginVertical]}>{status.message}</Text> : null;
    }

    const onPressChangePassword = (oldPassword, newPassword, verifyNewPassword) => {
        if (oldPassword === "" || newPassword === "" || verifyNewPassword === "" || newPassword !== verifyNewPassword)
            setShouldDisplayValidationText(true);
        else {
            setIsLoading(true);
            UserServices.chagePassword(authContext.state.userInfo.id, oldPassword, newPassword)
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

    return <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["oldPass"]}</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showOldPassword} onChangeText={text => setOldPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showOldPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowOldPassword(!showOldPassword)} />
        </View>
        {renderValidationText(oldPassword, shouldDisplayValidationText, `${langContext.state.translation["oldPass"]} ${langContext.state.translation["validationText"]}`)}
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
        {renderChangePasswordStatus(status)}
        <Button title={langContext.state.translation["changePass"]} loading={isLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressChangePassword(oldPassword, newPassword, verifyNewPassword)} />
    </View>
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    },
    inputField: {
        flexDirection: "row-reverse",
        alignItems: "center"
    }
});
