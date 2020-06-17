import React, { useContext } from 'react';
import { StyleSheet, View, Text, SectionList, ScrollView, Alert, Share } from 'react-native';
import { ListItem, Divider, Icon } from 'react-native-elements';

import ListCoursesItem from '../../common/list-courses-item';
import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { Colors } from '../../../globals/constants';

const ContentsTab = (props) => {
    const {theme} = useContext(ThemeContext);

    const onPressActionButton = (title) => {
        Alert.alert("", title, [
            { text: "Download", onPress: () => alert("Feature not support!!") },
            { text: "Share", onPress: ()=> Share.share({ message: `Share "${title}"` })},
            { text: "Cancel", style: "cancel"}
        ])
    }

    const renderSectionHeader = (section, theme) => {
        return (
            <View style={[theme.background, styles.container]}>
                <View style={[styles.sectionHeader, CommonStyles.shortMarginVertical]}>
                    <ListCoursesItem style={[{flex: 4}, theme.background]} theme={theme} noActiveOpacity data={section}  />
                    <View style={[styles.shortMarginLeft, {flexDirection: "row", flex: 1}]}>
                        {section.downloaded ? <Icon name="arrow-circle-down" type="font-awesome" containerStyle={styles.shortMarginLeft} color={theme.tintColor}/> : null}
                        <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig, styles.shortMarginLeft]} 
                            onPress={() => onPressActionButton(title)}>...</Text>
                    </View>
                </View>
                <Divider style={CommonStyles.divider} />
            </View>
        )
    }

    const renderItem = (item, theme) => {
        return <ListItem title={item.title} titleStyle={theme.titleColor} containerStyle={[styles.item, theme.background]}
            leftIcon={item.status === "playing" ? {name: "check-circle", color: Colors.dodgerBlue, size: 14}
                : item.status ==="done" ? {name: "check-circle", color: Colors.green, size: 14}
                : {name: "check-circle", color: Colors.green, size: 14}} titleProps={{numberOfLines: 1}}
            rightElement={() => {return item.status === "playing" ? <Text style={theme.textColor}>0:00 / {item.duration ? item.duration : "0:00"}</Text> : null}}
        />
    }

    return (
        <ScrollView style={theme.background}>
            <SectionList sections={props.data} stickySectionHeadersEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item, theme)}
                renderSectionHeader={({ section }) => renderSectionHeader(section, theme)}
                ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
            />
        </ScrollView>
    )
}

export default ContentsTab;

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    item: {
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
    shortMarginLeft: {
        marginLeft: 10
    }
});