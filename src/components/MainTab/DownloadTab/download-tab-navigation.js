import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DownloadTab from './download-tab';

import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { LanguageContext } from '../../../contexts/language-context';

const DownloadTabStack = createStackNavigator();

const DownloadTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    return (
        <DownloadTabStack.Navigator initialRouteName={ScreenName.downloadTab}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
            }}
        >
            <DownloadTabStack.Screen name={ScreenName.downloadTab} component={DownloadTab} options={{ headerTitle: langContext.state.translation.screenTitle.downloadTab }} />
        </DownloadTabStack.Navigator>
    )
}

export default DownloadTabNavigation;
