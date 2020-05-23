import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTab from './home-tab';
import Setting from '../../AccountManagement/Setting/setting';
import Profile from '../../AccountManagement/Profile/profile';
import VerifyPassword from '../../Authentication/VerifyPassword/verify-password';

import CommonStyles from '../../../globals/styles';
import { ScreenName, ScreenTitle, Colors } from '../../../globals/constants';

const HomeTabStack = createStackNavigator();

const HomeTabNavigation = (props) => {
    return (
        <HomeTabStack.Navigator initialRouteName={ScreenName.homeTab}
            screenOptions={{ headerStyle: CommonStyles.navigationHeader,
                headerTintColor: Colors.white
            }}
        >
            <HomeTabStack.Screen name={ScreenName.homeTab} component={HomeTab} options={{ headerTitle: ScreenTitle.homeTab }} />
            <HomeTabStack.Screen name={ScreenName.setting} component={Setting} options={{ headerTitle: ScreenTitle.setting }} />
            <HomeTabStack.Screen name={ScreenName.profile} component={Profile} options={{ headerTitle: ScreenTitle.profile }} />
            <HomeTabStack.Screen name={ScreenName.verifyPassword} component={VerifyPassword} />
        </HomeTabStack.Navigator>
    )
}

export default HomeTabNavigation;
