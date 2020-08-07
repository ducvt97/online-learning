import React, { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import ListInstructors from '../../../ListInstructors/list-instructors';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import { ScreenName } from '../../../../globals/constants';
import { LanguageContext } from '../../../../contexts/language-context';

const SearchAllTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const searchContext = useContext(SearchContext);
    const langContext = useContext(LanguageContext);

    const onPressHeaderButton = (screenName) => {
        props.navigation.jumpTo(screenName);
    }

    return <ScrollView style={[CommonStyles.shortPaddingHorizontal, theme.background]}>
        <ListCourses data={searchContext.state.searchResult.courses.length > 5 ? searchContext.state.searchResult.courses.slice(0, 5) :
                searchContext.state.searchResult.courses} theme={theme} headerTitle={langContext.state.translation["courses"]}
            rightButtonTitle={searchContext.state.searchResult.courses.length + ` ${langContext.state.translation["results"]}`}
            emptyListText={`No results match "${searchContext.state.currentSearchText}"`}
            onPressHeaderButton={() => onPressHeaderButton(ScreenName.searchCoursesTab)} navigation={props.navigation} />
        <ListInstructors data={searchContext.state.searchResult.instructors.length > 5 ? searchContext.state.searchResult.instructors.slice(0, 5) :
                searchContext.state.searchResult.instructors} theme={theme} headerTitle={langContext.state.translation["instructors"]} style={styles.list}
            rightButtonTitle={searchContext.state.searchResult.instructors.length + ` ${langContext.state.translation["results"]}`}
            emptyListText={`No results match "${searchContext.state.currentSearchText}"`}
            onPressHeaderButton={() => onPressHeaderButton(ScreenName.searchInstructorsTab)} navigation={props.navigation} />
    </ScrollView>
}

export default SearchAllTab;

const styles = StyleSheet.create({
    list: {
        marginBottom: 10
    }
});
