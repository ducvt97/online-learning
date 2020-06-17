import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { verifyPassword } from '../../../core/services/authentication-services';
import { ThemeContext } from '../../../contexts/theme-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';

const VerifyPassword = (props) => {
    const [password, setPassword] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState(null);

    const {theme} = useContext(ThemeContext);
    const {authentication} = useContext(AuthenticationContext);

    useEffect(() => {
        if (status && status.status === 200) {
            props.navigation.navigate(ScreenName.changePassword);
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderVerifyPasswordStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressVerify = (password) => {
        if (password === "")
            setShouldDisplayValidationText(true);
        else
            setStatus(verifyPassword(authentication.user, password));
    }

    return (
        <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
            <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>Enter your old password</Text>
            <View style={styles.inputField}>
                <TextInput style={[CommonStyles.input, theme.inputBackground, CommonStyles.flex]} secureTextEntry={!showPassword} onChangeText={text => setPassword(text)} />
                <Icon containerStyle={styles.inputIcon} name={showPassword ? "visibility-off" : "visibility"} size={20} onPress={() => setShowPassword(!showPassword)} />
            </View>
            {renderValidationText(password, shouldDisplayValidationText, "Password cannot be empty")}
            {renderVerifyPasswordStatus(status)}
            <Button title="Verify" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => onPressVerify(password)}
            />
        </View>
    )
}

export default VerifyPassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
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
