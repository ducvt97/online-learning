import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import CommonStyles from '../../../globals/styles';

const StartScreen = (props) => {
    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Image style={styles.logo} source={require("../../../../assets/logo.png")} />
            <Button title="Sign in" buttonStyle={CommonStyles.shortMarginVertical} />
            <Button title="Register now" type="outline" buttonStyle={CommonStyles.shortMarginVertical} />
            <Button title="Explore without sign in" type="outline" buttonStyle={CommonStyles.shortMarginVertical} />
        </View>
    )
}

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    logo: {
        alignSelf: "center",
        width: 300,
        height: 300
    }
});
