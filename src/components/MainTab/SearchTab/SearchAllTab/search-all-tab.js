import React, { useContext } from 'react';
import { StyleSheet, View, SectionList, Text } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import AuthorsList from '../AuthorsList/authors-list';
import SectionHeader from '../../../common/section-header';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import { ScreenName } from '../../../../globals/constants';

const SearchAllTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const {searches} = useContext(SearchContext);

    const section = [
        {
            title: "Courses",
            results: props.data.courses.length,
            data: [{ type: 1, data: props.data.courses }]
        },
        {
            title: "Paths",
            results: props.data.paths.length,
            data: [{ type: 2, data: props.data.paths }]
        },
        {
            title: "Authors",
            results: props.data.authors.length,
            data: [{ type: 3, data: props.data.authors }]
        }
    ];

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    const renderItem = (item) => {
        return item.data.length <= 0 ? <Text style={[styles.text, theme.textColor]}>No results match "{searches.currentSearchText}"</Text>
        : item.type === 1 ?
            <ListCourses screenName={ScreenName.courseDetail} data={item.data} theme={theme} onPressItem={onPressListItem} />
        : item.type === 2 ?
            <ListCourses data={item.data} theme={theme} onPressItem={onPressListItem} />
        : item.type === 3 ?
            <AuthorsList data={item.data} onPressItem={onPressListItem} />
        : null;
    }

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <SectionList sections={section} stickySectionHeadersEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title, results } }) => (
                    <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor} rightButtonTitle={results > 0 ? results + " results >" : null} />
                )}
            />
        </View>
    )
}

export default SearchAllTab;

const styles = StyleSheet.create({
    text: {
        marginVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16
    }
});
