import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ListEmptyView from '../../../common/list-empty-view';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import ListAuthors from '../../../ListAuthors/list-authors';

const SearchAuthorsTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const searchContext = useContext(SearchContext);

    return searchContext.state.searchResult.instructors.length > 0 ? 
        <View style={[CommonStyles.shortPaddingHorizontal, theme.background]}>
            <SectionHeader title={searchContext.state.searchResult.instructors.length + " Results"} titleStyle={theme.titleColor} />
            <ListAuthors data={searchContext.state.searchResult.instructors} theme={theme} title="Instructors" navigation={props.navigation} style={styles.list} />
        </View>
    : <ListEmptyView theme={theme} showIcon iconName="search" subtitle={`We couldn't find any matches for "${searchContext.state.currentSearchText}"`} />
}

export default SearchAuthorsTab;

const styles = StyleSheet.create({
    list: {
        marginBottom: 50
    }
});