import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseTab from './browse-tab';

import CommonStyles from '../../../globals/styles';
import { ScreenName, ScreenTitle, Colors } from '../../../globals/constants';

const BrowseTabStack = createStackNavigator();

const BrowseTabNavigation = (props) => {
    return (
        <BrowseTabStack.Navigator initialRouteName={ScreenName.browseTab}
            screenOptions={{ headerStyle: CommonStyles.navigationHeader,
                headerTintColor: Colors.white
            }}
        >
            <BrowseTabStack.Screen name={ScreenName.browseTab} component={BrowseTab} options={{ headerTitle: ScreenTitle.browseTab }} />
        </BrowseTabStack.Navigator>
    )
}

export default BrowseTabNavigation;
