import React, { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import ListAuthors from '../../../ListAuthors/list-authors';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import { ScreenName } from '../../../../globals/constants';

const SearchAllTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const searchContext = useContext(SearchContext);

    const onPressHeaderButton = (screenName) => {
        props.navigation.jumpTo(screenName);
    }

    return <ScrollView style={[CommonStyles.shortPaddingHorizontal, theme.background]}>
        <ListCourses data={searchContext.state.searchResult.courses} theme={theme} headerTitle="Courses"
            rightButtonTitle={searchContext.state.searchResult.courses.length + " results"}
            emptyListText={`No results match "${searchContext.state.currentSearchText}"`}
            onPressHeaderButton={() => onPressHeaderButton(ScreenName.searchCoursesTab)} navigation={props.navigation} />
        <ListAuthors data={searchContext.state.searchResult.instructors} theme={theme} headerTitle="Instructors" style={styles.list}
            rightButtonTitle={searchContext.state.searchResult.instructors.length + " results"}
            emptyListText={`No results match "${searchContext.state.currentSearchText}"`}
            onPressHeaderButton={() => onPressHeaderButton(ScreenName.searchAuthorsTab)} navigation={props.navigation} />
    </ScrollView>
}

export default SearchAllTab;

const styles = StyleSheet.create({
    list: {
        marginBottom: 10
    }
});
