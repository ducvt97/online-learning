import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import HomeTabNavigation from './HomeTab/home-tab-navigation';
import DownloadTabNavigation from './DownloadTab/download-tab-navigation';
import BrowseTabNavigation from './BrowseTab/browse-tab-navigation';
import { ThemeContext } from '../../contexts/theme-context';

import { Colors } from '../../globals/constants';
import { ScreenName, ScreenTitle } from '../../globals/constants';
import SearchTabNavigation from './SearchTab/search-tab-navigation';

const MainTab = createBottomTabNavigator();

const MainTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <MainTab.Navigator tabBarOptions={{
            activeTintColor: Colors.dodgerBlue,
            inactiveTintColor: theme.inactiveTintColor,
            style: theme.navigationHeader
        }}>
            <MainTab.Screen name={ScreenName.homeTabNavigation} component={HomeTabNavigation}
                options={{ tabBarLabel: ScreenTitle.homeTab,
                    tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />
            }}/>
            <MainTab.Screen name={ScreenName.downloadTabNavigation} component={DownloadTabNavigation}
                options={{ tabBarLabel: ScreenTitle.downloadTab,
                    tabBarIcon: ({ color, size }) => <Icon type="font-awesome" name="download" color={color} size={size} />
            }}/>
            <MainTab.Screen name={ScreenName.browseTab} component={BrowseTabNavigation}
                options={{ tabBarLabel: ScreenTitle.browseTab,
                    tabBarIcon: ({ color, size }) => <Icon name="filter-none" color={color} size={size} />
            }}/>
            <MainTab.Screen name={ScreenName.searchTab} component={SearchTabNavigation}
                options={{ tabBarLabel: ScreenTitle.searchTab,
                    tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />
            }}/>
        </MainTab.Navigator>
        
    );
}

export default MainTabNavigation;
