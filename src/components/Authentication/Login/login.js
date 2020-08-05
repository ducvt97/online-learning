import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon, SocialIcon } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';

const googleSignInConfig = {
    iosClientId: "33913581111-firjd69m8h8lm4rs554rp7s79csq6aet.apps.googleusercontent.com",
    androidClientId: "33913581111-m7vraqef24d1j6o7cmu06mmkuovtlnu6.apps.googleusercontent.com"
}

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);

    const authContext = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);

    React.useLayoutEffect(() => {
        if (props.isInHomeTab)
            props.navigation.setOptions({ title: ScreenTitle.login,
                headerLeft: () => <Icon name="settings" color={theme.tintColor} size={30} containerStyle={styles.headerButton}
                    onPress={()=> {props.navigation.navigate(ScreenName.setting)}} />
            });
    }, [{...theme}]);

    useEffect(() => {
        if (authContext.state.authenticated)
            if (props.isInHomeTab)
                props.navigation.navigate(ScreenName.homeTab);
            else
                props.navigation.navigate(ScreenName.mainTab);
    }, [authContext.state.authenticated]);

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderLoginStatus = (status) => {
        return status ? <Text style={CommonStyles.validationText}>{status}</Text> : null;
    }

    const onPressLogin = (email, password) => {
        if (email != "" && password != "") {
            setIsLoading(true);
            UserServices.login(email, password)
                .then(response => {
                    setIsLoading(false);
                    if (response.status === 200)
                        authContext.login(response.data);
                    else
                        setStatus(response.data.message);
                }).catch(error => {
                    setIsLoading(false);
                    setStatus(error.message);
                    UserServices.handleError(error);
                });
        } else
            setShouldDisplayValidationText(true);
    }

    const onPressLoginWithGoogle = async () => {
        try {
            const { type, user } = await Google.logInAsync(googleSignInConfig);
            if (type === "success") {
                setIsGoogleSignInLoading(true);
                UserServices.loginWithGoogle(user.email, user.id)
                    .then(response => {
                        setIsGoogleSignInLoading(false);
                        if (response.status === 200)
                            authContext.login(response.data);
                        else
                            setStatus(response.data.message);
                    }).catch(error => {
                        setIsGoogleSignInLoading(false);
                        setStatus(error.message);
                        UserServices.handleError(error);
                    });
            }
        } catch ({ message }) { alert("Error:" + message + ". This may happens because you close Google Sign In page unexpectedly. If you still want to Sign In With Google, please close and reopen the application."); }
    }

    return <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email</Text>
        <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setEmail(text)} />
        {renderValidationText(email, shouldDisplayValidationText, "Email cannot be empty")}
        <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
        <View style={styles.inputField}>
            <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showPassword} onChangeText={text => setPassword(text)} />
            <Icon containerStyle={CommonStyles.inputIcon} name={showPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowPassword(!showPassword)} />
        </View>
        {renderValidationText(password, shouldDisplayValidationText, "Password cannot be empty")}
        {renderLoginStatus(status)}
        <Button title="Sign in" loading={isLoading} disabled={isGoogleSignInLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressLogin(email, password)} />
        <SocialIcon type="google" button title="Sign In With Google" loading={isGoogleSignInLoading} style={styles.googleBtn} iconSize={30} fontStyle={CommonStyles.fontSizeAverage} onPress={onPressLoginWithGoogle} />
        <Button title="Forget password" type="outline" disabled={isLoading || isGoogleSignInLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => props.navigation.navigate(ScreenName.forgetPassword)} />
        <Button title="Don't have an account? Register now" type="outline" disabled={isLoading || isGoogleSignInLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => props.navigation.navigate(ScreenName.register)} />
    </View>
}

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    headerButton: {
        marginHorizontal: 10
    },
    inputField: {
        flexDirection: "row-reverse",
        alignItems: "center"
    },
    googleBtn: {
        borderRadius: 2,
        marginHorizontal: 0
    }
});