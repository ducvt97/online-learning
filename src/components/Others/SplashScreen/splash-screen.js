import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';

const SplashScreen = (props) => {
    const [loading, setLoading] = useState(0);

    const authContext = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        const timer = setInterval(() => setLoading(loading => loading + 1), 10);
        if (loading >= 100) {
            clearInterval(timer);
            if (authContext.state.authenticated)
                props.navigation.navigate(ScreenName.mainTab);
            else
                props.navigation.navigate(ScreenName.startScreen);
        }
        return () => {
            clearInterval(timer);
        }
    }, [loading]);

    return (
        <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
            <Image style={styles.logo} source={require("../../../../assets/logo.png")} />
            <Text style={theme.titleColor}>Loading... {loading} %</Text>
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
