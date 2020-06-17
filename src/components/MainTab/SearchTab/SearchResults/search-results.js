import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';
import { Colors, ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import SectionHeader from '../../../common/section-header';
import ListEmptyView from '../../../common/list-empty-view';

const SearchResults = (props) => {
    
    const {theme} = useContext(ThemeContext);
    const {searches, onSearch, clearRecentSearches} = useContext(SearchContext);
    const [data, setData] = useState(searches.recentSearches);

    useEffect(() => {
        setData(searches.searchTextResult);
    }, [{...searches}])

    const onPressListItem = (item) => {
        onSearch(item);
        props.navigation.navigate(ScreenName.searchResultsTabNavigation);
    }

    const renderItem = ({item}) => (
        <ListItem containerStyle={styles.item} title={item}
            titleStyle={[CommonStyles.fontSizeAverage, theme.textColor]}
            onPress={() => onPressListItem(item)}
            leftIcon={{ name: "search", color: theme.inactiveTintColor }}
            bottomDivider
        />
    )

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            {searches.currentSearchText === "" ? searches.recentSearches.length > 0 ?
                <SectionHeader style={theme.background} title="Recent searches" titleStyle={theme.titleColor} rightButtonTitle="Clear" onPressRightButton={clearRecentSearches} />
                : <ListEmptyView theme={theme} title="Search by title, author, or subject." subtitle="Over 7000 courses at your fingertips." />
            : null}
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default SearchResults;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});
