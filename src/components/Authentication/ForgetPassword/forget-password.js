import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { verifyCode, verifyEmail } from '../../../core/services/authentication-services';
import { ThemeContext } from '../../../contexts/theme-context';
import { AccountsContext } from '../../../contexts/accounts-context';

const ForgetPassword = (props) => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [didEmailFocus, setDidEmailFocus] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [status, setStatus] = useState(null);

    const {theme} = useContext(ThemeContext);
    const {accounts} = useContext(AccountsContext);

    useEffect(() => {
        this.timer = setInterval(() => setCountdown(countdown => countdown - 1), 1000);
        if (countdown <= 0 && isCodeSent) {
            clearInterval(this.timer);
            setIsCodeSent(false);
        }
        return () => {
            clearInterval(this.timer);
        }
    }, [countdown])

    useEffect(() => {
        if (status && status.status === 200 && !status.message.includes("Email"))
            props.navigation.navigate(ScreenName.changePassword, {email: email});
    }, [status])

    const renderValidation = (textInput, didFocus, message) => {
        return textInput === "" && didFocus ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderVerifyStatus = (status) => {
        return status ? isCodeSent && status.message.includes("Email") ? null
            : <Text style={CommonStyles.validationText}>{status.message}</Text>
        : null;
    }

    const onPressSendCode = (email) => {
        if (email != "") {
            const status = verifyEmail(accounts, email);
            if (status.status === 200) {
                setIsCodeSent(true);
                setCountdown(120);
            } else
                setStatus(status);
        } else {
            setDidEmailFocus(true);
        }
    }

    return !isCodeSent ? 
        <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
            <Text style={[styles.description, theme.titleColor]}>Enter your email address. We will send you a verification code.</Text>
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email address</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onEndEditing={() => setDidEmailFocus(true)} onChangeText={text => setEmail(text)} />
            {renderValidation(email, didEmailFocus, "Email address cannot be empty")}
            {renderVerifyStatus(status)}
            <Button title="Send verification code" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressSendCode(email)} />
        </View>
        : <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[styles.description, theme.titleColor]}>We have sent a verification code to your email. Please enter code to continue.</Text>
            <Text style={[styles.description, theme.titleColor]}>Time left: {countdown} second(s)</Text>
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Veification code</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setVerificationCode(text)} value={verificationCode} />
            {renderVerifyStatus(status)}
            <Button title="Verify" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => setStatus(verifyCode(verificationCode))} />
        </View>
}

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    description: {
        marginBottom: 30,
        fontSize: 20,
    }
});