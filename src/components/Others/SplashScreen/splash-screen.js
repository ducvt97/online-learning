import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import CommonStyles from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';

const SplashScreen = (props) => {
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        this.timer = setInterval(() => setLoading(loading => loading + 1), 10);
        if (loading >= 100) {
            clearInterval(this.timer);
            props.navigation.navigate(ScreenName.startScreen);
        }
        return () => {
            clearInterval(this.timer);
        }
    }, [loading]);

    return (
        <View style={[CommonStyles.generalContainer, styles.container]}>
            <Image style={styles.logo} source={require("../../../../assets/logo.png")} />
            <Text style={CommonStyles.titleColor}>Loading... {loading} %</Text>
        </View>
    )
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
