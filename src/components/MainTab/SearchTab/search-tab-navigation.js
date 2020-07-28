import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchAllTab from './SearchAllTab/search-all-tab';
import SearchCoursesTab from './SearchCoursesTab/search-courses-tab';
import SearchInstructorsTab from './SearchInstructorsTab/search-instructors-tab';
import SearchResults from './SearchResults/search-results';
import SearchHeader from './SearchHeader/search-header';

import { CommonStyles } from '../../../globals/styles';
import { ScreenName, ScreenTitle, Colors } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const SearchTab = createStackNavigator();
const SearchResultsTab = createMaterialTopTabNavigator();

const SearchResultsTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <SearchResultsTab.Navigator initialRouteName={ScreenName.searchAllTab}
            tabBarOptions={{
                activeTintColor: Colors.dodgerBlue,
                inactiveTintColor: theme.inactiveTintColor,
                style: theme.navigationHeader,
                labelStyle: [CommonStyles.fontSizeSmall, CommonStyles.fontWeightBold, {marginHorizontal: -5}]
            }}
        >
            <SearchResultsTab.Screen name={ScreenName.searchAllTab} component={SearchAllTab}
                options={{ headerShown: false,
                    tabBarLabel: ScreenTitle.searchAllTab
            }} />
            <SearchResultsTab.Screen name={ScreenName.searchCoursesTab} component={SearchCoursesTab}
                options={{ headerShown: false,
                    tabBarLabel: ScreenTitle.searchCoursesTab
            }} />
            <SearchResultsTab.Screen name={ScreenName.searchInstructorsTab} component={SearchInstructorsTab}
                options={{ headerShown: false,
                    tabBarLabel: ScreenTitle.searchInstructorsTab
            }} />
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
