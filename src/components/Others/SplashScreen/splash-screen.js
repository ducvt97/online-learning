import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import CommonStyles from '../../../globals/styles';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[CommonStyles.generalContainer, styles.container]}>
                <Image style={styles.logo} source={require("../../../../assets/logo.png")} />
                <Text style={CommonStyles.titleColor}>Loading... %</Text>
            </View>
        )
    }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 300,
        height: 300
    }
});
