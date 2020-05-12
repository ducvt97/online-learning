import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './src/components/Authentication/Login/login';
import ForgetPassword from './src/components/Authentication/ForgetPassword/forget-password';
import Register from './src/components/Authentication/Register/register';
import ChangePassword from './src/components/Authentication/ChangePassword/change-password';

export default function App() {
    return (
        <View style={styles.container}>
            <ChangePassword />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});
