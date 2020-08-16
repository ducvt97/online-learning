import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';
import { LanguageContext } from '../../../contexts/language-context';

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
    const langContext = useContext(LanguageContext);

    useEffect(() => {
        // Check if user register new account success, navigate to login screen
        if (status && status.status === 200) {
            alert(langContext.state.translation["registerSuccessMsg"]);
            props.navigation.navigate(ScreenName.login);
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return shouldDisplay && textInput === "" ? <Text style={CommonStyles.validationText}>{message}</Text>
            : shouldDisplay && (message.includes("match") || message.includes("giống")) ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderRegisterStatus = (status) => {
        return status ? <Text style={CommonStyles.validationText}>{status.message}</Text> : null;
    }

    const onPressRegister = (name, email, phone, password, verifyPassword) => {
        if (name === "" || email === "" || phone === "" || password === "" || verifyPassword === "" || password !== verifyPassword)
            setShouldDisplayValidationText(true);
        else
            UserServices.register(name, email, phone, password)
                .then(response => {
                    if (status === 200) {
                        UserServices.sendActivateEmail(email)   // If register success, send link activate to user email
                            .then(response1 => {
                                setStatus({status: response1.status, message: response1.data.message});
                            })
                            .catch(error => {
                                setStatus({status: 503, message: error.message});
                                UserServices.handleError(error);
                            });
                    } else
                        setStatus({status: response.status, message: response.data.message});
                }).catch(error => {
                    setStatus({status: 503, message: error.message});
                    UserServices.handleError(error);
                });
    }

    return <ScrollView style={[CommonStyles.generalContainer, theme.background]}>
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["name"]}</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setName(text)} />
        {renderValidationText(name, shouldDisplayValidationText, `${langContext.state.translation["name"]} ${langContext.state.translation["validationText"]}`)}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setEmail(text)} />
        {renderValidationText(email, shouldDisplayValidationText, `Email ${langContext.state.translation["validationText"]}`)}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["phone"]}</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setPhone(text)} />
        {renderValidationText(phone, shouldDisplayValidationText, `${langContext.state.translation["phone"]} ${langContext.state.translation["validationText"]}`)}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["password"]}</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showPassword} onChangeText={text => setPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowPassword(!showPassword)} />
        </View>
        {renderValidationText(password, shouldDisplayValidationText, `${langContext.state.translation["password"]} ${langContext.state.translation["validationText"]}`)}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>{langContext.state.translation["verify"]} {langContext.state.translation["password"]}</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showVerifyPassword} onChangeText={text => setVerifyPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showVerifyPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowVerifyPassword(!showVerifyPassword)} />
        </View>
        {renderValidationText(verifyPassword, shouldDisplayValidationText, password !== verifyPassword ?
            langContext.state.translation["verifyPassValidationText"] : `${langContext.state.translation["verify"]} ${langContext.state.translation["password"]} ${langContext.state.translation["validationText"]}`)}
        {renderRegisterStatus(status)}
        <Button title={langContext.state.translation["register"]} buttonStyle={[CommonStyles.shortMarginVertical, styles.button]} onPress={() => onPressRegister(name, email, phone, password, verifyPassword)} />
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
