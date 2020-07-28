import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ListCourses from '../../../Courses/ListCourses/list-courses';
import ListEmptyView from '../../../common/list-empty-view';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';

const SearchCoursesTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const searchContext = useContext(SearchContext);
    
    return searchContext.state.searchResult.courses.length > 0 ? 
        <View style={[CommonStyles.shortPaddingHorizontal, theme.background]}>
            <SectionHeader title={searchContext.state.searchResult.courses.length + " Results"} titleStyle={theme.titleColor} />
            <ListCourses data={searchContext.state.searchResult.courses} theme={theme} navigation={props.navigation} style={styles.list} />
        </View>
    : <ListEmptyView theme={theme} showIcon iconName="search" subtitle={`We couldn't find any matches for "${searchContext.state.currentSearchText}"`} />
}

export default SearchCoursesTab;

const styles = StyleSheet.create({
    list: {
        marginBottom: 50
    }
});
