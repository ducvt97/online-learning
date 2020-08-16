import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';
import { Colors } from '../../../../globals/constants';
import { ThemeContext, themes } from '../../../../contexts/theme-context';
import { LanguageContext } from '../../../../contexts/language-context';
import Spinner from 'react-native-loading-spinner-overlay';

const Theme = (props) => {
    const {theme, setTheme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);
    const [isLightTheme, setIsLightTheme] = useState(theme === themes.light ? true : false);
    const [themeLoading, setThemeLoading] = useState(false);

    // User choose light theme
    const onPressLightTheme = async () => {
        if (theme != themes.light) {
            setThemeLoading(true);
            await setTheme("light");
            setIsLightTheme(true);
            setThemeLoading(false);
        }
    }

    // User choose dark theme
    const onPressDarkTheme = async () => {
        if (theme != themes.dark) {
            setThemeLoading(true);
            await setTheme("dark");
            setIsLightTheme(false);
            setThemeLoading(false);
        }
    }

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <Spinner visible={themeLoading} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
            <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>{langContext.state.translation["theme"]}</Text>
            <ListItem title={langContext.state.translation["light"]} titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                checkmark={isLightTheme} onPress={onPressLightTheme} />
            <Divider style={CommonStyles.divider} />
            <ListItem title={langContext.state.translation["dark"]} titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                checkmark={!isLightTheme} onPress={onPressDarkTheme} />
            <Divider style={CommonStyles.divider} />
        </View>
    )
}

export default Theme;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});