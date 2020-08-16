import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import HomeTabNavigation from './HomeTab/home-tab-navigation';
import DownloadTabNavigation from './DownloadTab/download-tab-navigation';
import BrowseTabNavigation from './BrowseTab/browse-tab-navigation';
import SearchTabNavigation from './SearchTab/search-tab-navigation';

import { Colors } from '../../globals/constants';
import { ScreenName } from '../../globals/constants';
import { ThemeContext } from '../../contexts/theme-context';
import { LanguageContext } from '../../contexts/language-context';

const MainTab = createBottomTabNavigator();

const MainTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    return (
        <MainTab.Navigator tabBarOptions={{
            activeTintColor: Colors.dodgerBlue,
            inactiveTintColor: theme.inactiveTintColor,
            style: theme.navigationHeader
        }}>
            <MainTab.Screen name={ScreenName.homeTabNavigation} component={HomeTabNavigation}
                options={{ tabBarLabel: langContext.state.translation.screenTitle.homeTab,
                    tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />
            }}/>
            <MainTab.Screen name={ScreenName.downloadTabNavigation} component={DownloadTabNavigation}
                options={{ tabBarLabel: langContext.state.translation.screenTitle.downloadTab,
                    tabBarIcon: ({ color, size }) => <Icon type="font-awesome" name="download" color={color} size={size} />
            }}/>
            <MainTab.Screen name={ScreenName.browseTab} component={BrowseTabNavigation}
                options={{ tabBarLabel: langContext.state.translation.screenTitle.browseTab,
                    tabBarIcon: ({ color, size }) => <Icon name="filter-none" color={color} size={size} />
            }}/>
            <MainTab.Screen name={ScreenName.searchTab} component={SearchTabNavigation}
                options={{ tabBarLabel: langContext.state.translation.screenTitle.searchTab,
                    tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />
            }}/>
        </MainTab.Navigator>
        
    );
}

export default MainTabNavigation;
