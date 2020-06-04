import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { login } from '../../../core/services/authentication-services';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);

    const {setAuthenticated, setUser} = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);

    React.useLayoutEffect(() => {
        if (props.isInHomeTab)
            props.navigation.setOptions({ title: ScreenTitle.login,
                headerLeft: () => <Icon name="settings" color={theme.tintColor} size={30} containerStyle={styles.headerButton} 
                    onPress={()=> {props.navigation.navigate(ScreenName.setting)}}
                />
            });
    }, []);

    useEffect(() => {
        if (status && status.status === 200)
            props.navigation.navigate(ScreenName.mainTab, { screen: ScreenName.homeTab });
    }, [status]);

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderLoginStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressLogin = (username, password, setAuthenticated, setUser) => {
        if (username != "" && password != "") {
            const loginStatus = login(username, password);
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
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email or username</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setUsername(text)} />
            {renderValidationText(username, shouldDisplayValidationText, "Username cannot be empty")}
            <Text style={[theme.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} secureTextEntry onChangeText={text => setPassword(text)} />
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
    }
});
