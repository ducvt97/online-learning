import React, { useContext } from 'react';
import { View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ListCourses from '../../../Courses/ListCourses/list-courses';

import { CommonStyles } from '../../../../globals/styles';
import SearchData from '../../../../raw-data/search';
import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';

const SearchPathsTab = (props) => {
    const data = SearchData[1];
    const {theme} = useContext(ThemeContext);
    
    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <SectionHeader title={data.results + " Results"} titleStyle={theme.titleColor} />
            <ListCourses data={data.data[0].data} theme={theme} onPressItem={() => props.navigation.navigate(ScreenName.courseDetail)} />
        </View>
    )
}

export default SearchPathsTab;
