import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';
import { verifyCode } from '../../../core/services/authentication-services';

const ForgetPassword = (props) => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [didEmailFocus, setDidEmailFocus] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [status, setStatus] = useState(null);

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
        if (status && status.status === 200)
            props.navigation.navigate(ScreenName.changePassword);
    }, [status])

    const renderValidation = (textInput, didFocus, message) => {
        return textInput === "" && didFocus ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderVerifyStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressSendCode = (email) => {
        if (email != "") {
            setIsCodeSent(true);
            setCountdown(120);
        } else {
            setDidEmailFocus(true);
        }
    }

    return !isCodeSent ? 
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={styles.description}>Enter your email address. We will send you a verification code.</Text>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email address</Text>
            <TextInput style={CommonStyles.input} onEndEditing={() => setDidEmailFocus(true)} onChangeText={text => setEmail(text)} />
            {renderValidation(email, didEmailFocus, "Email address cannot be empty")}
            <Button title="Send verification code" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressSendCode(email)} />
        </View>
        : <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={styles.description}>We have sent a verification code to your email. Please enter code to continue.</Text>
            <Text style={styles.description}>Time left: {countdown} second(s)</Text>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Veification code</Text>
            <TextInput style={CommonStyles.input} onChangeText={text => setVerificationCode(text)} value={verificationCode} />
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
        color: Colors.ghostWhite
    }
});