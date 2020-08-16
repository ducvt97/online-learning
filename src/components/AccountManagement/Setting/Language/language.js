import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { CommonStyles } from '../../../../globals/styles';
import { Colors } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { LanguageContext } from '../../../../contexts/language-context';

const Language = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);
    const [languageLoading, setLanguageLoading] = useState(false);

    // User choose English
    const onPressEnglish = async () => {
        if (langContext.state.locale !== "en") {
            setLanguageLoading(true);
            await langContext.setLocale("en");
            setLanguageLoading(false);
        }
    }

    // User choose Vietnamese
    const onPressVietnamese = async () => {
        if (langContext.state.locale !== "vi") {
            setLanguageLoading(true);
            await langContext.setLocale("vi");
            setLanguageLoading(false);
        }
    }

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <Spinner visible={languageLoading} color={Colors.ghostWhite} overlayColor="rgba(0, 0, 0, 0.6)" />
            <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig, CommonStyles.shortMarginVertical]}>{langContext.state.translation["language"]}</Text>
            <ListItem title={langContext.state.translation["english"]} titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                checkmark={langContext.state.locale === "en"} onPress={onPressEnglish} />
            <Divider style={CommonStyles.divider} />
            <ListItem title={langContext.state.translation["vietnamese"]} titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item}
                checkmark={langContext.state.locale === "vi"} onPress={onPressVietnamese} />
            <Divider style={CommonStyles.divider} />
        </View>
    )
}

export default Language;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});