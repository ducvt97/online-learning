import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Button } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import UserServices from '../../../core/services/user-services';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ScreenName } from '../../../globals/constants';
import { LanguageContext } from '../../../contexts/language-context';

const ChangeEmail = (props) => {
    const [email, setEmail] = useState("");
    const [shouldDisplayValidationText, setShouldDisplayValidationText] = useState(false);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {theme} = useContext(ThemeContext);
    const authContext = useContext(AuthenticationContext);
    const langContext = useContext(LanguageContext);

    useEffect(() => {
        // If user change email success, force user to login again
        if (status && status.status === 200) {
            authContext.logout();
            alert(langContext.state.translation["changeEmailSuccessMsg"]);
            props.navigation.dispatch(CommonActions.navigate({ name: ScreenName.startScreen }));
        }
    }, [status])

    const renderValidationText = (textInput, shouldDisplay, message) => {
        return textInput === "" && shouldDisplay ? <Text style={CommonStyles.validationText}>{message}</Text> : null;
    }

    const renderChangeEmailStatus = (status) => {
        return !status ? null : <Text style={CommonStyles.validationText}>{status.message}</Text>
    }

    const onPressChangeEmail = (email) => {
        if (email === "")
            setShouldDisplayValidationText(true);
        else {
            setIsLoading(true);
            UserServices.changeEmail(email)
                .then(response => {
                    setIsLoading(false);
                    setStatus({ status: response.status, message: response.data.message });
                })
                .catch(error => {
                    setIsLoading(false);
                    setStatus({ status: 503, message: error.message });
                    UserServices.handleError(error);
                });
        }
    }

    return (
        <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
            <Text style={[theme.textColor, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>{langContext.state.translation["newEmail"]}</Text>
            <TextInput style={[CommonStyles.input, theme.inputBackground]} onChangeText={text => setEmail(text)} />
            {renderValidationText(email, shouldDisplayValidationText, `Email ${langContext.state.translation["validationText"]}`)}
            {renderChangeEmailStatus(status)}
            <Button title={langContext.state.translation["changeEmail"]} loading={isLoading} buttonStyle={CommonStyles.shortMarginVertical} onPress={() => onPressChangeEmail(email)} />
        </View>
    )
}

export default ChangeEmail;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    }
});
