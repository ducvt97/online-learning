import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchAllTab from './SearchAllTab/search-all-tab';
import SearchCoursesTab from './SearchCoursesTab/search-courses-tab';
import SearchPathsTab from './SearchPathsTab/search-paths-tab';
import SearchAuthorsTab from './SearchAuthorsTab/search-authors-tab';
import SearchResults from './SearchResults/search-results';
import SearchHeader from './SearchHeader/search-header';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName, ScreenTitle, Colors } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { SearchContext } from '../../../contexts/search-context';

const SearchTab = createStackNavigator();
const SearchResultsTab = createMaterialTopTabNavigator();

const SearchResultsTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext);
    const {searches} = useContext(SearchContext);
    const data = searches.searchResult;

    return (
        <SearchResultsTab.Navigator initialRouteName={ScreenName.searchAllTab}
            tabBarOptions={{
                activeTintColor: Colors.dodgerBlue,
                inactiveTintColor: theme.inactiveTintColor,
                style: theme.navigationHeader,
                labelStyle: [CommonStyles.fontSizeSmall, CommonStyles.fontWeightBold, {marginHorizontal: -5}]
            }}
        >
            <SearchResultsTab.Screen name={ScreenName.searchAllTab}
                options={{ headerShown: false,
                    tabBarLabel: ScreenTitle.searchAllTab
            }}>
                {props => <SearchAllTab {...props} data={data} />}
            </SearchResultsTab.Screen>
            <SearchResultsTab.Screen name={ScreenName.searchCoursesTab}
                options={{ headerShown: false,
                    tabBarLabel: ScreenTitle.searchCoursesTab
            }}>
                {props => <SearchCoursesTab {...props} data={data.courses} />}
            </SearchResultsTab.Screen>
            <SearchResultsTab.Screen name={ScreenName.searchPathsTab}
                options={{ headerShown: false,
                    tabBarLabel: ScreenTitle.searchPathsTab
            }}>
                {props => <SearchPathsTab {...props} data={data.paths} />}
            </SearchResultsTab.Screen>
            <SearchResultsTab.Screen name={ScreenName.searchAuthorsTab}
                options={{ headerShown: false,
                    tabBarLabel: ScreenTitle.searchAuthorsTab
            }}>
                {props => <SearchAuthorsTab {...props} data={data.authors} />}
            </SearchResultsTab.Screen>
        </SearchResultsTab.Navigator>
    )
}

const SearchTabNavigation = (props) => {
    return (
        <SearchTab.Navigator initialRouteName={ScreenName.searchResults} p
            screenOptions={({ navigation, route }) => ({
                header: () => <SearchHeader navigation={navigation} route={route} />
        })}>
            <SearchTab.Screen name={ScreenName.searchResults} component={SearchResults} />
            <SearchTab.Screen name={ScreenName.searchResultsTabNavigation} component={SearchResultsTabNavigation} />
        </SearchTab.Navigator>
    )
}

export default SearchTabNavigation;
