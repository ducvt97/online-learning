import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DownloadTab from './download-tab';

import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const DownloadTabStack = createStackNavigator();

const DownloadTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <DownloadTabStack.Navigator initialRouteName={ScreenName.downloadTab}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
            }}
        >
            <DownloadTabStack.Screen name={ScreenName.downloadTab} component={DownloadTab} options={{ headerTitle: ScreenTitle.downloadTab }} />
        </DownloadTabStack.Navigator>
    )
}

export default DownloadTabNavigation;
