import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import SearchData from '../../../raw-data/search';
import ListCourses from '../../Courses/ListCourses/list-courses';
import SectionHeader from '../../common/section-header';
import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const DownloadTab = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <View style={[CommonStyles.generalContainer, CommonStyles.flex, theme.background]}>
            <SectionHeader style={[styles.header, theme.background]} title="Download" titleStyle={theme.titleColor} rightButtonTitle="Remove all" />
            <ListCourses data={SearchData[0].data[0].data} theme={theme} onPressItem={() => props.navigation.navigate(ScreenName.courseDetail)} />
        </View>
    )
}

export default DownloadTab;

const styles = StyleSheet.create({
    header: {
        marginTop: 10
    }
});
