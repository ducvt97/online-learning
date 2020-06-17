import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';

const SearchHeader = (props) => {
    const {searches, onSearch, onChangeCurrentSearchText} = useContext(SearchContext);
    const {theme} = useContext(ThemeContext);

    const onChangeText = (text) => {
        onChangeCurrentSearchText(text);
        if (props.route.name === ScreenName.searchResultsTabNavigation) {
            props.navigation.navigate(ScreenName.searchResults, {searchText: searches.currentSearchText});
        }
    }

    const onClear = () => {
        onChangeCurrentSearchText("");
        if (props.route.name === ScreenName.searchResultsTabNavigation) {
            props.navigation.navigate(ScreenName.searchResults);
        }
    }

    const onSubmitEditing = (text) => {
        onSearch(text);
        props.navigation.navigate(ScreenName.searchResultsTabNavigation);
    }

    return (
        <View >
            <SearchBar containerStyle={[styles.searchContainer, theme.navigationHeader]} 
                cancelButtonProps={{buttonStyle: styles.buttonCancel, buttonTextStyle: theme.textColor}}
                platform="ios" placeholder="Search" showCancel={true}
                onChangeText={(text) => onChangeText(text)}
                onCancel={onClear}
                onClear={onClear}
                onSubmitEditing={() => onSubmitEditing(searches.currentSearchText)}
                value={searches.currentSearchText}
            />
        </View>
    )
}

export default SearchHeader;

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 10,
        paddingTop: 30,
    },
    buttonCancel: {
        marginTop: 10,
        marginRight: 5
    }
});
