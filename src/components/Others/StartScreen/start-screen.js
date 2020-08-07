import React, { useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { LanguageContext } from '../../../contexts/language-context';

const StartScreen = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    return (
        <View style={[CommonStyles.generalContainer, styles.container, theme.background]}>
            <Image style={styles.logo} source={require("../../../../assets/logo.png")} />
            <Button title={langContext.state.translation["login"]} buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => props.navigation.navigate(ScreenName.login)}
            />
            <Button title={langContext.state.translation["registerBtn"]} type="outline" buttonStyle={CommonStyles.shortMarginVertical}
                onPress={() => props.navigation.navigate(ScreenName.register)}
            />
            <Button title={langContext.state.translation["exploreBtn"]} type="outline" buttonStyle={CommonStyles.shortMarginVertical}
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
