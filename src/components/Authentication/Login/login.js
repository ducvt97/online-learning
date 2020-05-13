import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from '../InputField/input-field';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';

const Login = (props) => {
    return (
        <View style={styles.container}>
            <InputField title="Email or username" />
            <InputField title="Password" isPassword={true} />
            <Button title="Sign in" buttonStyle={CommonStyles.shortMarginVertical} />
            <Button title="Forget password" type="outline" buttonStyle={CommonStyles.shortMarginVertical} />
            <Button title="Don't have an account? Register now" type="outline" buttonStyle={CommonStyles.shortMarginVertical} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
        backgroundColor: "black"
    }
});
