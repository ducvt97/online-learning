import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [status, setStatus] = useState(null);

    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        if (status && status.status === 200) {
            alert("Register successfully. Please check your email and click on the link that we have just sent you to activate your account.")
            props.navigation.navigate(ScreenName.login);
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return shouldDisplay && textInput === "" ? <Text style={CommonStyles.validationText}>{message}</Text>
             : shouldDisplay && message.includes("match") ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderRegisterStatus = (status) => {
        return status ? <Text style={CommonStyles.validationText}>{status.message}</Text> : null;
    }

    const onPressRegister = (name, email, phone, password, verifyPassword) => {
        if (name === "" || email === "" || phone === "" || password === "" || verifyPassword === "" || password !== verifyPassword)
            setShouldDisplayValidationText(true);
        else {
            UserServices.register(name, email, phone, password)
                .then(response => {
                    if (status === 200) {
                        UserServices.sendActivateEmail(email)
                            .then(response1 => {
                                setStatus({status: response1.status, message: response1.data.message});
                            })
                            .catch(error => {
                                setStatus({status: 503, message: error.message});
                                UserServices.handleError(error);
                            });
                    } else
                        setStatus({status: response.status, message: response.data.message});
                })
                .catch(error => {
                    setStatus({status: 503, message: error.message});
                    UserServices.handleError(error);
                });
        }
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Name</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setName(text)} />
        {renderValidationText(name, shouldDisplayValidationText, "Name cannot be empty")}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email address</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setEmail(text)} />
        {renderValidationText(email, shouldDisplayValidationText, "Email cannot be empty")}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Phone</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setPhone(text)} />
        {renderValidationText(phone, shouldDisplayValidationText, "Phone cannot be empty")}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showPassword} onChangeText={text => setPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowPassword(!showPassword)} />
        </View>
        {renderValidationText(password, shouldDisplayValidationText, "Password cannot be empty")}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify password again</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showVerifyPassword} onChangeText={text => setVerifyPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showVerifyPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowVerifyPassword(!showVerifyPassword)} />
        </View>
        {password != "" && verifyPassword != "" && verifyPassword != password
            ? renderValidationText(verifyPassword, shouldDisplayValidationText, password !== verifyPassword ? "Verify password does not match password" : "Verify password cannot be empty")
            : renderValidationText(verifyPassword, shouldDisplayValidationText, "Verify password cannot be empty")}
        {renderRegisterStatus(status)}
        <Button title="Register" buttonStyle={[CommonStyles.shortMarginVertical, styles.button]} onPress={() => onPressRegister(name, email, phone, password, verifyPassword)} />
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
    }
});
