import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from '../InputField/input-field';
import CustomButton from '../CustomButton/custom-button';

const Login = (props) => {
    return (
        <View style={styles.container}>
            <InputField title="Email or username" />
            <InputField title="Password" isPassword={true} />
            <CustomButton title="Sign in" isNormal={true} />
            <CustomButton title="Forget password" isNormal={false} />
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
