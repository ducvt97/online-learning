import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import SearchResults from './SearchResults/search-results';
import SearchData from '../../../raw-data/search';
import Colors from '../../../globals/constants/colors';
import CommonStyles from '../../../globals/styles';


const Search = (props) => {
    const [searchText, setSearchText] = useState("");
    const onChangeText = (text) => {
        setSearchText(searchText => text);
    }

    return (
        <View style={CommonStyles.flex}>
            <SearchBar containerStyle={styles.searchContainer}
                cancelButtonProps={{buttonStyle: styles.buttonCancel, color: Colors.white}}
                platform="ios" placeholder="Search" showCancel={true}
                onChangeText={(text) => onChangeText(text)}
                value={searchText}
            />
            <SearchResults data={SearchData} />
        </View>
    )
}

export default Search;

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
