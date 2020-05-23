import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import CommonStyles from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';

const ChangePassword = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>New password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry />
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify new password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry />
            <Button title="Change password" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => {
                    alert("Password changed successfully!! Please login again.");
                    props.navigation.dispatch(
                        CommonActions.navigate({
                            name: ScreenName.login
                        })
                    );
                }}
            />
        </View>
    )
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    }
});
