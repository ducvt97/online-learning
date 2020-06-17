import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTab from './home-tab';
import Setting from '../../AccountManagement/Setting/setting';
import Profile from '../../AccountManagement/Profile/profile';
import VerifyPassword from '../../Authentication/VerifyPassword/verify-password';
import Login from '../../Authentication/Login/login';
import Theme from '../../AccountManagement/Setting/Theme/theme';

import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';

const HomeTabStack = createStackNavigator();

const HomeTabNavigation = (props) => {
    const {authentication} = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);
    return (
        <HomeTabStack.Navigator initialRouteName={authentication.authenticated ? ScreenName.homeTab : ScreenName.login}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
            }}
        >
            <HomeTabStack.Screen name={ScreenName.login} options={{ headerTitle: ScreenTitle.login }}>
                {props => <Login {...props} isInHomeTab={true} />}
            </HomeTabStack.Screen>
            <HomeTabStack.Screen name={ScreenName.homeTab} component={HomeTab} options={{ headerTitle: ScreenTitle.homeTab }} />
            <HomeTabStack.Screen name={ScreenName.setting} component={Setting} options={{ headerTitle: ScreenTitle.setting }} />
            <HomeTabStack.Screen name={ScreenName.profile} component={Profile} options={{ headerTitle: ScreenTitle.profile }} />
            <HomeTabStack.Screen name={ScreenName.verifyPassword} component={VerifyPassword} />
            <HomeTabStack.Screen name={ScreenName.theme} component={Theme} options={{ title: ScreenTitle.theme }} />
        </HomeTabStack.Navigator>
    )
}

export default HomeTabNavigation;
