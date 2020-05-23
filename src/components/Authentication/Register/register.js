import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import CommonStyles from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';

const Register = (props) => {
    return (
        <ScrollView style={[CommonStyles.generalContainer, styles.container]}>
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Full name</Text>
            <TextInput style={CommonStyles.input} />

            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Username</Text>
            <TextInput style={CommonStyles.input} />

            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Email address</Text>
            <TextInput style={CommonStyles.input} />

            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Password</Text>
            <TextInput style={CommonStyles.input} secureTextEntry />
            
            <Text style={[CommonStyles.textColor, CommonStyles.fontSizeAverage, CommonStyles.shortMarginVertical]}>Verify password again</Text>
            <TextInput style={CommonStyles.input} secureTextEntry />

            <Button title="Register" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => {
                    alert("You have registered a new account. You can now sign in.");
                    props.navigation.dispatch(
                        CommonActions.navigate({
                            name: ScreenName.login
                        })
                    )}
                }
            />
        </ScrollView>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30
    }
});
