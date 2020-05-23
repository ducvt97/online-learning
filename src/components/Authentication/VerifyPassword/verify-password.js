import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from '../InputField/input-field';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';

const VerifyPassword = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <InputField title="Enter your old password" isPassword={true} />
            <Button title="Verify" buttonStyle={CommonStyles.shortMarginVertical} />
        </View>
    )
}

export default VerifyPassword;

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    }
});
