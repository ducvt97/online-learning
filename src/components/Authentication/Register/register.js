import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import InputField from '../InputField/input-field';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';

const Register = (props) => {
    return (
        <ScrollView style={[CommonStyles.generalContainer, styles.container]}>
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
        marginTop: 40
    }
});
