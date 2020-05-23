import React from 'react';
import { View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ListCourses from '../../../Courses/ListCourses/list-courses';

import CommonStyles from '../../../../globals/styles';
import SearchData from '../../../../raw-data/search';
import { ScreenName } from '../../../../globals/constants';

const SearchPathsTab = (props) => {
    const data = SearchData[1];
    
    return (
        <View style={CommonStyles.generalContainer}>
            <SectionHeader title={data.results + " Results"} />
            <ListCourses data={data.data[0].data} onPressItem={() => props.navigation.navigate(ScreenName.courseDetail)} />
        </View>
    )
}

export default SearchPathsTab;
