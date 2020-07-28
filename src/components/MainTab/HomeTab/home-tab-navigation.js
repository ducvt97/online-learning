import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTab from './home-tab';
import Setting from '../../AccountManagement/Setting/setting';
import Profile from '../../AccountManagement/Profile/profile';
import ChangeEmail from '../../Authentication/ChangeEmail/change-email';
import Login from '../../Authentication/Login/login';
import Theme from '../../AccountManagement/Setting/Theme/theme';
import ListCourses from '../../Courses/ListCourses/list-courses';

import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';

const HomeTabStack = createStackNavigator();

const HomeTabNavigation = (props) => {
    const authContext = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);

    return (
        <HomeTabStack.Navigator initialRouteName={authContext.state.authenticated ? ScreenName.homeTab : ScreenName.login}
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
            <HomeTabStack.Screen name={ScreenName.changeEmail} component={ChangeEmail} options={{ headerTitle: ScreenTitle.changeEmail }} />
            <HomeTabStack.Screen name={ScreenName.theme} component={Theme} options={{ title: ScreenTitle.theme }} />
            <HomeTabStack.Screen name={ScreenName.continueLearning} component={ListCourses} options={{ headerTitle: ScreenTitle.continueLearning }} />
            <HomeTabStack.Screen name={ScreenName.favorites} component={ListCourses} options={{ headerTitle: ScreenTitle.favorites }} />
        </HomeTabStack.Navigator>
    )
}

export default HomeTabNavigation;
