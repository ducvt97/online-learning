import React, { useContext } from 'react';
import { View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ListCourses from '../../../Courses/ListCourses/list-courses';
import ListEmptyView from '../../../common/list-empty-view';

import { CommonStyles } from '../../../../globals/styles';
import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';

const SearchCoursesTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const {searches} = useContext(SearchContext);

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }
    
    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            {props.data.length > 0 ? <SectionHeader title={props.data.length + " Results"} titleStyle={theme.titleColor} />
                : <ListEmptyView theme={theme} showIcon iconName="search" subtitle={`We couldn't find any matches for "${searches.currentSearchText}"`} />}
            <ListCourses data={props.data} theme={theme} screenName={ScreenName.courseDetail} onPressItem={onPressListItem} />
        </View>
    )
}

export default SearchCoursesTab;
