import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import CoursesServices from '../../../../core/services/courses-services';
import { LanguageContext } from '../../../../contexts/language-context';
import { AuthenticationContext } from '../../../../contexts/authentication-context';

const SearchHeader = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const searchContext = useContext(SearchContext);
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);
    const authContext = useContext(AuthenticationContext);

    const onChangeText = (text) => {
        searchContext.changeSearchText(text);
        if (props.route.name === ScreenName.searchResultsTabNavigation)
            props.navigation.navigate(ScreenName.searchResults);
    }

    const onClear = () => {
        searchContext.changeSearchText("");
        if (props.route.name === ScreenName.searchResultsTabNavigation)
            props.navigation.navigate(ScreenName.searchResults);
    }

    const onSubmitEditing = (text) => {
        setIsLoading(true);
        CoursesServices.search(text, authContext.state.token)
            .then(async response => {
                if (response.status === 200) {
                    let searchHistory = 0;
                    await CoursesServices.getSearchHistory()
                        .then(response1 => {
                            if (response1.status === 200) {
                                searchHistory = response1.data.payload.data;
                            } else
                                console.log(response1.data.message);
                        })
                        .catch(error1 => CoursesServices.handleError(error1));
                    await searchContext.search({
                        searchText: text,
                        searchResult: {
                            courses: response.data.payload.courses.data,
                            instructors: response.data.payload.instructors.data
                        },
                        recentSearches: searchHistory
                    });
                    setIsLoading(false);
                    props.navigation.navigate(ScreenName.searchResultsTabNavigation);
                } else
                    alert(response.data.message);
                setIsLoading(false);
            }).catch(error => {
                setIsLoading(false);
                alert(error);
                CoursesServices.handleError(error);
            });
    }

    return <View>
        <Spinner visible={isLoading} color={theme.tintColor} />
        <SearchBar containerStyle={[styles.searchContainer, theme.navigationHeader]} 
            cancelButtonProps={{buttonStyle: styles.buttonCancel, buttonTextStyle: theme.textColor}}
            cancelButtonTitle={langContext.state.translation["cancel"]}
            platform="ios" placeholder="Search" showCancel={true}
            onChangeText={(text) => onChangeText(text)} onCancel={onClear} onClear={onClear}
            onSubmitEditing={() => onSubmitEditing(searchContext.state.currentSearchText)}
            value={searchContext.state.currentSearchText} />
    </View>
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
