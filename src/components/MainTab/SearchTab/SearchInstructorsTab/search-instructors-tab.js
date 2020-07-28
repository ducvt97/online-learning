import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ListEmptyView from '../../../common/list-empty-view';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import ListInstructors from '../../../ListInstructors/list-instructors';

const SearchInstructorsTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const searchContext = useContext(SearchContext);

    return searchContext.state.searchResult.instructors.length > 0 ? 
        <View style={[CommonStyles.shortPaddingHorizontal, theme.background, CommonStyles.flex]}>
            <SectionHeader title={searchContext.state.searchResult.instructors.length + " Results"} titleStyle={theme.titleColor} />
            <ListInstructors data={searchContext.state.searchResult.instructors} theme={theme} title="Instructors" navigation={props.navigation} style={styles.list} />
        </View>
    : <ListEmptyView theme={theme} showIcon iconName="search" subtitle={`We couldn't find any matches for "${searchContext.state.currentSearchText}"`} />
}

export default SearchInstructorsTab;

const styles = StyleSheet.create({
    list: {
        marginBottom: 50
    }
});