import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { CommonStyles } from '../../../globals/styles';
import { Colors, ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const Setting = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <ScrollView>
                <ListItem title="Theme" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]} containerStyle={styles.item} onPress={()=>props.navigation.navigate(ScreenName.theme)} chevron />
                <Divider style={CommonStyles.divider} />
                <ListItem title="Version" titleStyle={[theme.titleColor, CommonStyles.fontSizeAverage]}
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