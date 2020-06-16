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
            data: [{ type: 1, data: props.data.courses }]
        },
        {
            title: "Paths",
            data: [{ type: 2, data: props.data.paths }]
        },
        {
            title: "Authors",
            data: [{ type: 3, data: props.data.authors }]
        }
    ];

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    const onPressHeaderButton = (type) => {
        if (type === 1)
            return props.navigation.jumpTo(ScreenName.searchCoursesTab);
        else if (type === 2)
            return props.navigation.jumpTo(ScreenName.searchPathsTab);
        else if (type === 3)
            return props.navigation.jumpTo(ScreenName.searchAuthorsTab);
    }

    const renderSectionHeader = (title, data) => {
        const dataLength = data[0].data.length;
        return data[0].data.length > 0 ? 
            <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor} rightButtonTitle={dataLength + " results >"}
                onPressRightButton={() => onPressHeaderButton(data[0].type)} rightButtonTitleStyle={theme.titleColor} />
            : <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor} />
    }

    const renderItem = (item) => {
        return item.data.length <= 0 ? <Text style={[styles.text, theme.textColor]}>No results match "{searches.currentSearchText}"</Text>
        : item.type === 1 ?
            <ListCourses screenName={ScreenName.courseDetail} data={item.data} theme={theme} onPressItem={onPressListItem} />
        : item.type === 2 ?
            <ListCourses data={item.data} screenName={ScreenName.pathDetail} theme={theme} onPressItem={onPressListItem} />
        : item.type === 3 ?
            <AuthorsList screenName={ScreenName.authorDetail} data={item.data} onPressItem={onPressListItem} />
        : null;
    }

    return <View style={[CommonStyles.generalContainer, theme.background]}>
            <SectionList sections={section} stickySectionHeadersEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title, data } }) => renderSectionHeader(title, data)}
            />
        </View>
}

export default SearchAllTab;

const styles = StyleSheet.create({
    text: {
        marginVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16
    }
});
