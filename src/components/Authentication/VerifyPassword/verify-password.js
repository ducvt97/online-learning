import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';

const VerifyPassword = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>Enter your old password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry />
            <Button title="Verify" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => props.navigation.navigate(ScreenName.changePassword)}
            />
        </View>
    )
}

export default VerifyPassword;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    }
});
