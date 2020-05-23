import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { Colors, ScreenName } from '../../../../globals/constants';

const SearchHeader = (props) => {
    const [searchText, setSearchText] = useState(props.route.params ? props.route.params.searchText : "");

    const onChangeText = (text) => {
        setSearchText(searchText => text);
        if (props.route.name === ScreenName.searchResultsTabNavigation) {
            props.navigation.navigate(ScreenName.searchResults, {searchText: text});
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
            <SearchBar containerStyle={styles.searchContainer} autoFocus
                cancelButtonProps={{buttonStyle: styles.buttonCancel, color: Colors.white}}
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
        backgroundColor: Colors.boldGrey
    },
    buttonCancel: {
        marginTop: 10,
        marginRight: 5
    }
});
