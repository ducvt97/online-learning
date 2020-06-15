import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ListCourses from '../../Courses/ListCourses/list-courses';
import SectionHeader from '../../common/section-header';
import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { getDownloadedCourses } from '../../../core/services/courses-services';

const DownloadTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const downloadedCourses = getDownloadedCourses();

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return (
        <View style={[CommonStyles.generalContainer, CommonStyles.flex, theme.background]}>
            <SectionHeader style={[styles.header, theme.background]} title="Download" titleStyle={theme.titleColor}
                rightButtonTitle={downloadedCourses.length > 0 ? "Remove all" : null} />
            {downloadedCourses.length > 0 ? <ListCourses data={downloadedCourses} theme={theme} screenName={ScreenName.courseDetail} onPressItem={onPressListItem} />
                :<Text style={[theme.textColor, CommonStyles.fontSizeAverage, styles.header]}>No download course found.</Text>}
        </View>
    )
}

export default DownloadTab;

const styles = StyleSheet.create({
    header: {
        marginTop: 10
    }
});
