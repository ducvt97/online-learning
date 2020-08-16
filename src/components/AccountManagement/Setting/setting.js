import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';
import { ThemeContext, themes } from '../../../contexts/theme-context';
import { LanguageContext } from '../../../contexts/language-context';

const Setting = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <ScrollView>
                <ListItem title={langContext.state.translation["theme"]} chevron
                    titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                    rightTitle={theme === themes.dark ? langContext.state.translation["dark"] : langContext.state.translation["light"]}
                    rightTitleStyle={theme.titleColor} onPress={() => props.navigation.navigate(ScreenName.theme)} />
                <Divider style={CommonStyles.divider} />
                <ListItem title={langContext.state.translation["language"]} chevron
                    titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                    rightTitle={langContext.state.locale === "vi" ? langContext.state.translation["vietnamese"] : langContext.state.translation["english"]}
                    rightTitleStyle={theme.titleColor} onPress={() => props.navigation.navigate(ScreenName.language)} />
                <Divider style={CommonStyles.divider} />
                <ListItem title={langContext.state.translation["version"]} titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]}
                    containerStyle={styles.item} rightTitle="v1.0.0" rightTitleStyle={theme.titleColor} />
                <Divider style={CommonStyles.divider} />
            </ScrollView>
        </View>
    )
}

export default Setting;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});