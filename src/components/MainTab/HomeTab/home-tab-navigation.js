import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTab from './home-tab';
import Setting from '../../AccountManagement/Setting/setting';
import Profile from '../../AccountManagement/Profile/profile';
import ChangeEmail from '../../Authentication/ChangeEmail/change-email';
import Login from '../../Authentication/Login/login';
import Theme from '../../AccountManagement/Setting/Theme/theme';
import Language from '../../AccountManagement/Setting/Language/language';
import ListCourses from '../../Courses/ListCourses/list-courses';

import { ScreenName } from '../../../globals/constants';
import { AuthenticationContext } from '../../../contexts/authentication-context';
import { ThemeContext } from '../../../contexts/theme-context';
import { LanguageContext } from '../../../contexts/language-context';

const HomeTabStack = createStackNavigator();

const HomeTabNavigation = (props) => {
    const authContext = useContext(AuthenticationContext);
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    return (
        <HomeTabStack.Navigator initialRouteName={authContext.state.authenticated ? ScreenName.homeTab : ScreenName.login}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
            }}
        >
            <HomeTabStack.Screen name={ScreenName.login} options={{ headerTitle: langContext.state.translation.screenTitle.login }}>
                {props => <Login {...props} isInHomeTab={true} />}
            </HomeTabStack.Screen>
            <HomeTabStack.Screen name={ScreenName.homeTab} component={HomeTab} options={{ headerTitle: langContext.state.translation.screenTitle.homeTab }} />
            <HomeTabStack.Screen name={ScreenName.setting} component={Setting} options={{ headerTitle: langContext.state.translation.screenTitle.setting }} />
            <HomeTabStack.Screen name={ScreenName.profile} component={Profile} options={{ headerTitle: langContext.state.translation.screenTitle.profile }} />
            <HomeTabStack.Screen name={ScreenName.changeEmail} component={ChangeEmail} options={{ headerTitle: langContext.state.translation.screenTitle.changeEmail }} />
            <HomeTabStack.Screen name={ScreenName.theme} component={Theme} options={{ title: langContext.state.translation.screenTitle.theme }} />
            <HomeTabStack.Screen name={ScreenName.language} component={Language} options={{ title: langContext.state.translation.screenTitle.language }} />
            <HomeTabStack.Screen name={ScreenName.continueLearning} component={ListCourses} options={{ headerTitle: langContext.state.translation.screenTitle.continueLearning }} />
            <HomeTabStack.Screen name={ScreenName.favorites} component={ListCourses} options={{ headerTitle: langContext.state.translation.screenTitle.favorites }} />
            <HomeTabStack.Screen name={ScreenName.coursesRecommend} component={ListCourses} options={{ headerTitle: langContext.state.translation.screenTitle.coursesRecommend }} />
        </HomeTabStack.Navigator>
    )
}

export default HomeTabNavigation;
