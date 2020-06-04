import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';

const SearchHeader = (props) => {
    const [searchText, setSearchText] = useState("");
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        props.navigation.setParams({searchText: searchText});
    }, [])

    const onChangeText = (text) => {
        setSearchText(searchText => text);
        if (props.route.name === ScreenName.searchResultsTabNavigation) {
            props.navigation.navigate(ScreenName.searchResults, {searchText: searchText});
        } else {
            props.navigation.setParams({searchText: searchText});
        }
    }

    const onClear = () => {
        setSearchText(searchText => "");
        if (props.route.name === ScreenName.searchResultsTabNavigation) {
            props.navigation.navigate(ScreenName.searchResults, {searchText: ""});
        } else{
            props.navigation.setParams({searchText: searchText});
        }
    }

    return (
        <View >
            <SearchBar containerStyle={[styles.searchContainer, theme.navigationHeader]} autoFocus
                cancelButtonProps={{buttonStyle: styles.buttonCancel, buttonTextStyle: theme.textColor}}
                platform="ios" placeholder="Search" showCancel={true}
                onChangeText={(text) => onChangeText(text)}
                onCancel={onClear}
                onClear={onClear}
                value={searchText}
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
