import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import SectionHeader from '../../../common/section-header';
import ListEmptyView from '../../../common/list-empty-view';

import { CommonStyles } from '../../../../globals/styles';
import { Colors, ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import CoursesServices from '../../../../core/services/courses-services';
import { LanguageContext } from '../../../../contexts/language-context';
import { AuthenticationContext } from '../../../../contexts/authentication-context';

const SearchResults = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const {theme} = useContext(ThemeContext);
    const searchContext = useContext(SearchContext);
    const langContext = useContext(LanguageContext);
    const authContext = useContext(AuthenticationContext);

    const onPressListItem = (item) => {
        setIsLoading(true);
        CoursesServices.search(item, authContext.state.token)
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
                        searchText: item,
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

    const renderItem = ({item}) => (
        <ListItem containerStyle={styles.item} title={item.content}
            titleStyle={[CommonStyles.fontSizeAverage, theme.textColor]}
            onPress={() => onPressListItem(item.content)}
            leftIcon={{ name: "search", color: theme.inactiveTintColor }}
            bottomDivider />
    )

    const onPressClearRecentSearches = async () => {
        if (authContext.state.authenticated) {
            for (const search of searchContext.state.recentSearches) {
                CoursesServices.deleteSearchHistory(search.id)
                    .then(response => {
                        if (response.status === 200) {
                            searchHistory = response.data.payload;
                        } else
                            console.log(response.data.message);
                    })
                    .catch(error => CoursesServices.handleError(error));
            }
        } else {
            try {
                await AsyncStorage.setItem("recentSearches", JSON.stringify([]));
            } catch (error) {
                console.log(error);
            }
        }
        searchContext.clearRecentSearches();
    }

    return <View style={[CommonStyles.generalContainer, theme.background]}>
        <Spinner visible={isLoading} color={theme.tintColor} />
        {searchContext.state.currentSearchText === "" ? searchContext.state.recentSearches.length > 0 ?
            <SectionHeader style={theme.background} title={langContext.state.translation["recentSearch"]} titleStyle={theme.titleColor} 
                rightButtonTitle={langContext.state.translation["clear"]} onPressRightButton={onPressClearRecentSearches} />
            : <ListEmptyView theme={theme} title={langContext.state.translation["searchResultEmptyTitle"]} subtitle={langContext.state.translation["searchResultEmptySubtitle"]} />
        : null}
        <FlatList keyExtractor={(item, index) => index.toString()} data={searchContext.state.recentSearches} renderItem={renderItem} />
    </View>
}

export default SearchResults;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});
