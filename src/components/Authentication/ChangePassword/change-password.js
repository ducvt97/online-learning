import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputField from '../InputField/input-field';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';

const ChangePassword = (props) => {
    return (
        <View style={styles.container}>
            <InputField title="New password" isPassword={true} />
            <InputField title=" Verify new password" isPassword={true} />
            <Button title="Change password" buttonStyle={CommonStyles.shortMarginVertical} />
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
