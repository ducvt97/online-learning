import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';
import { Colors } from '../../../../globals/constants';
import { ThemeContext, themes } from '../../../../contexts/theme-context';

const Theme = (props) => {
    const {theme, setTheme} = useContext(ThemeContext);
    const [isLightTheme, setIsLightTheme] = useState(theme === themes.light ? true : false);

    const onPressLightTheme = () => {
        if (theme != themes.light) {
            setTheme(themes.light);
            setIsLightTheme(true);
        }
    }

    const onPressDarkTheme = () => {
        if (theme != themes.dark) {
            setTheme(themes.dark);
            setIsLightTheme(false);
        }
    }

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>Theme</Text>
            <ListItem title="Light" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                checkmark={isLightTheme} onPress={onPressLightTheme} />
            <Divider style={CommonStyles.divider} />
            <ListItem title="Dark" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
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