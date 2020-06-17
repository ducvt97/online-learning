import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { login } from '../../../core/services/authentication-services';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';
import { AccountsContext } from '../../../contexts/accounts-context';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {accounts} = useContext(AccountsContext);
    const {setAuthenticated, setUser} = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);

    React.useLayoutEffect(() => {
        if (props.isInHomeTab)
            props.navigation.setOptions({ title: ScreenTitle.login,
                headerLeft: () => <Icon name="settings" color={theme.tintColor} size={30} containerStyle={styles.headerButton} 
                    onPress={()=> {props.navigation.navigate(ScreenName.setting)}}
                />
            });
    }, [{...theme}]);

    useEffect(() => {
        if (status && status.status === 200)
            if (props.isInHomeTab)
                props.navigation.navigate(ScreenName.homeTab);
            else
                props.navigation.navigate(ScreenName.mainTab);
    }, [status]);

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderLoginStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressLogin = (username, password, setAuthenticated, setUser) => {
        if (username != "" && password != "") {
            const loginStatus = login(accounts, username, password);
            if (loginStatus.status === 200){
                setAuthenticated(true);
                setUser(loginStatus.user);
            }
            setStatus(loginStatus);
        } else
            setShouldDisplayValidationText(true);
    }

    return (
        <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Username or Email</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setUsername(text)} />
            {renderValidationText(username, shouldDisplayValidationText, "Username cannot be empty")}
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
            <View style={styles.inputField}>
                <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showPassword} onChangeText={text => setPassword(text)} />
                <Icon containerStyle={styles.inputIcon} name={showPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowPassword(!showPassword)} />
            </View>
            {renderValidationText(password, shouldDisplayValidationText, "Password cannot be empty")}
            {renderLoginStatus(status)}
            <Button title="Sign in" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressLogin(username, password, setAuthenticated, setUser)} />
            <Button title="Forget password" type="outline" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => props.navigation.navigate(ScreenName.forgetPassword)} />
            <Button title="Don't have an account? Register now" type="outline" buttonStyle={CommonStyles.shortMarginVertical} onPress={() => props.navigation.navigate(ScreenName.register)} />
        </View>
    )
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
    inputIcon: {
        zIndex: 100,
        position: "absolute",
        marginRight: 10
    }
});
