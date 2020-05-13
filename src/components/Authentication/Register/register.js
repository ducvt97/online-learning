import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import InputField from '../InputField/input-field';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';

const Register = (props) => {
    return (
        <ScrollView style={styles.container}>
            <InputField title="Full name" />
            <InputField title="Username" />
            <InputField title="Email address" />
            <InputField title="Password" isPassword={true} />
            <InputField title="Verify password again" isPassword={true} />
            <Button title="Register" buttonStyle={CommonStyles.shortMarginVertical} />
        </ScrollView>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginTop: 50,
        backgroundColor: "black"
    }
});
