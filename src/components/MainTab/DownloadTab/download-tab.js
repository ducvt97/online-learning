import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';

import ListEmptyView from '../../common/list-empty-view';
import SectionHeader from '../../common/section-header';
import ListCoursesItem from '../../common/list-courses-item';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { LanguageContext } from '../../../contexts/language-context';
import { DownloadContext } from '../../../contexts/download-context';
import { AuthenticationContext } from '../../../contexts/authentication-context';

const DownloadTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);
    const downloadContext = useContext(DownloadContext);
    const authContext = useContext(AuthenticationContext);

    const onPressActionButton = (title, courseId) => {
        Alert.alert(langContext.state.translation["removeFromDownload"], title, [
            { text: langContext.state.translation["remove"], onPress: () => downloadContext.removeDownloadedCourse(courseId) },
            { text: "Cancel", style: "cancel"}
        ]);
    }

    const onPressListItem = (itemId) => {
        props.navigation.navigate(ScreenName.courseDetail, {itemId: itemId});
    }

    const renderItem = ({item}) => {
        return <View style={[styles.sectionHeader, CommonStyles.shortMarginVertical]}>
            <ListCoursesItem style={[{flex: 7}, theme.background]} theme={theme} noActiveOpacity data={item} onPress={() => onPressListItem(item.id)} />
            <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig, styles.shortMarginLeft, CommonStyles.flex, styles.actionButton]} 
                onPress={() => onPressActionButton(item.title, item.id)}>...</Text>
        </View>
    }

    return authContext.state.authenticated ?
        <View style={[CommonStyles.generalContainer, CommonStyles.flex, theme.background]}>
            {downloadContext.state.downloadedCoursesInfo.length > 0 ? <>
                <SectionHeader style={[styles.header, theme.background]} title={langContext.state.translation["download"]} titleStyle={theme.titleColor}
                    rightButtonTitle={langContext.state.translation["removeAll"]} onPressRightButton={downloadContext.removeAllDownloadedCourse} />
                <FlatList data={downloadContext.state.downloadedCoursesInfo} keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem} />
            </> : <ListEmptyView theme={theme} showIcon iconName="download" iconType="font-awesome" title={langContext.state.translation["downloadEmptyTitle"]}
                subtitle={langContext.state.translation["downloadEmptySubtitle"]} />}
        </View>
    : <ListEmptyView theme={theme} showIcon iconName="download" iconType="font-awesome" title={langContext.state.translation["loginRequireAction"]} />
}

export default DownloadTab;

const styles = StyleSheet.create({
    header: {
        marginTop: 10
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionButton: {
        textAlign: "center"
    }
});
