import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';
import { LanguageContext } from '../../../contexts/language-context';

const ForgetPassword = (props) => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [didEmailFocus, setDidEmailFocus] = useState(false);
    const [didVerifyCodeFocus, setDidVerifyCodeFocus] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sendEmailStatus, setSendEmailStatus] = useState(null);
    const [verifyCodeStatus, setVerifyCodeStatus] = useState(null);
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    useEffect(() => {
        // If code is sent to user's email, change screen for user to enter code
        if (sendEmailStatus && sendEmailStatus.status === 200)
            setIsCodeSent(true);
    }, [sendEmailStatus])

    useEffect(() => {
        // If user enter correct code, navigate to login screen
        if (verifyCodeStatus && verifyCodeStatus.status === 200)
            props.navigation.navigate(ScreenName.resetPassword, { userId: verifyCodeStatus.userId });
    }, [verifyCodeStatus])

    const renderValidation = (textInput, didFocus, message) => {
        return textInput === "" && didFocus ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderVerifyStatus = (status) => {
        return status ? <Text style={CommonStyles.validationText}>{status.message}</Text> : null;
    }

    const onPressSendCode = (email) => {
        if (email && email != "") {
            setIsLoading(true);
            UserServices.verifyEmail(email)
                .then(response => {
                    setIsLoading(false);
                    setSendEmailStatus({status: response.status, message: response.data.message});
                })
                .catch(error => {
                    setIsLoading(false);
                    setSendEmailStatus({status: 503, message: error.message});
                    UserServices.handleError(error);
                });
        } else {
            setDidEmailFocus(true);
        }
    }

    const onPressVerifyCode = (code) => {
        if (code && code != "") {
            setIsLoading(true);
            UserServices.verifyCode(code)
                .then(response => {
                    setIsLoading(false);
                    setVerifyCodeStatus({status: response.status, message: response.data.message, userId: response.data.id});
                })
                .catch(error => {
                    setIsLoading(false);
                    UserServices.handleError(error);
                    setVerifyCodeStatus({status: 503, message: error.message});
                });
        } else {
            setDidVerifyCodeFocus(true);
        }
    }

    return !isCodeSent ? <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
        <Text style={[styles.description, theme.titleColor]}>{langContext.state.translation["forgetPassSendEmailDescription"]}</Text>
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onEndEditing={() => setDidEmailFocus(true)} onChangeText={text => setEmail(text)} />
        {renderValidation(email, didEmailFocus, `Email ${langContext.state.translation["validationText"]}`)}
        {renderVerifyStatus(sendEmailStatus)}
        <Button title={`${langContext.state.translation["send"]} ${langContext.state.translation["verifyCode"]}`} loading={isLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressSendCode(email)} />
    </View>
    : <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
        <Text style={[styles.description, theme.titleColor]}>{langContext.state.translation["forgetPassSendCodeDescription"]}</Text>
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["verifyCode"]}</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onEndEditing={() => setDidVerifyCodeFocus(true)} onChangeText={text => setVerificationCode(text)} value={verificationCode} />
        {renderValidation(verificationCode, didVerifyCodeFocus, `${langContext.state.translation["verifyCode"]} ${langContext.state.translation["validationText"]}`)}
        {renderVerifyStatus(verifyCodeStatus)}
        <Button title={langContext.state.translation["verify"]} loading={isLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressVerifyCode(verificationCode)} />
        <Button title={langContext.state.translation["alreadyResetPassBtn"]} type="outline" loading={isLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressVerifyCode(verificationCode)} />
    </View>
}

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    description: {
        marginBottom: 10,
        fontSize: 20,
    }
});