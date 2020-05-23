import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DownloadTab from './download-tab';

import { ScreenName, ScreenTitle, Colors } from '../../../globals/constants';
import CommonStyles from '../../../globals/styles';

const DownloadTabStack = createStackNavigator();

const DownloadTabNavigation = (props) => {
    return (
        <DownloadTabStack.Navigator initialRouteName={ScreenName.downloadTab}
            screenOptions={{ headerStyle: CommonStyles.navigationHeader,
                headerTintColor: Colors.white
            }}
        >
            <DownloadTabStack.Screen name={ScreenName.downloadTab} component={DownloadTab} options={{ headerTitle: ScreenTitle.downloadTab }} />
        </DownloadTabStack.Navigator>
    )
}

export default DownloadTabNavigation;
