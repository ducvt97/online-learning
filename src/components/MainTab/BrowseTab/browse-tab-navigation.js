import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseTab from './browse-tab';

import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const BrowseTabStack = createStackNavigator();

const BrowseTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext)
    return (
        <BrowseTabStack.Navigator initialRouteName={ScreenName.browseTab}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
            }}
        >
            <BrowseTabStack.Screen name={ScreenName.browseTab} component={BrowseTab} options={{ headerTitle: ScreenTitle.browseTab }} />
        </BrowseTabStack.Navigator>
    )
}

export default BrowseTabNavigation;
