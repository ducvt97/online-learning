import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from '../InputField/input-field';
import CustomButton from '../CustomButton/custom-button';

const ChangePassword = (props) => {
    return (
        <View style={styles.container}>
            <InputField title="New password" isPassword={true} />
            <InputField title=" Verify new password" isPassword={true} />
            <CustomButton title="Change password" isNormal={true} />
        </View>
    )
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginTop: 50,
        backgroundColor: "black"
    }
});
