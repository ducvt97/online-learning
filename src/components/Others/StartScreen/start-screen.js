import React, { useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const StartScreen = (props) => {
    const {theme} = useContext(ThemeContext);
    return (
        <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
            <Image style={styles.logo} source={require("../../../../assets/logo.png")} />
            <Button title="Sign in" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => props.navigation.navigate(ScreenName.login)}
            />
            <Button title="Register now" type="outline" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => props.navigation.navigate(ScreenName.register)}
            />
            <Button title="Explore without sign in" type="outline" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => props.navigation.navigate(ScreenName.mainTab, {
                    screen: ScreenName.browseTab
                })}
            />
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
