import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import ListCourses from '../../Courses/ListCourses/list-courses';
import ListEmptyView from '../../common/list-empty-view';
import SectionHeader from '../../common/section-header';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const DownloadTab = (props) => {
    const {theme} = useContext(ThemeContext);
    let downloadedCourses = [];

    const onPressRightHeaderButton = () => {}

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return (
        <View style={[CommonStyles.generalContainer, CommonStyles.flex, theme.background]}>
            {downloadedCourses.length > 0 ? <>
                <SectionHeader style={[styles.header, theme.background]} title="Download" titleStyle={theme.titleColor}
                    rightButtonTitle={downloadedCourses.length > 0 ? "Remove all" : null} onPressRightButton={onPressRightHeaderButton} />
                    <ListCourses data={downloadedCourses} theme={theme} screenName={ScreenName.courseDetail} onPressItem={onPressListItem} />
            </> : <ListEmptyView theme={theme} showIcon iconName="download" iconType="font-awesome" title="No downloads" 
                subtitle="Courses you download will appear here." />}
        </View>
    )
}

export default DownloadTab;

const styles = StyleSheet.create({
    header: {
        marginTop: 10
    }
});
