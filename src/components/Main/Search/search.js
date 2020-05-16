import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SearchBar } from 'react-native-elements';
import Colors from '../../../globals/constants/colors';
import SearchResults from './SearchResults/search-results';
import SearchData from '../../../raw-data/search';


const Search = (props) => {
    return (
        <View>
            <SearchBar containerStyle={styles.searchContainer}
                cancelButtonProps={{buttonStyle: styles.buttonCancel, color: Colors.white}}
                platform="ios" placeholder="Search" showCancel={true}
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
        backgroundColor: Colors.dimGrey
    },
    buttonCancel: {
        marginTop: 10,
        marginRight: 5
    }
});
