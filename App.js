import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import Login from './src/components/Authentication/Login/login';
import ForgetPassword from './src/components/Authentication/ForgetPassword/forget-password';
import Register from './src/components/Authentication/Register/register';
import ChangePassword from './src/components/Authentication/ChangePassword/change-password';
import StartScreen from './src/components/Others/StartScreen/start-screen';
import SplashScreen from './src/components/Others/SplashScreen/splash-screen';
import MainTabNavigation from './src/components/MainTab/main-tab-navigation';
import CourseDetail from './src/components/CourseDetail/course-detail';
import AuthorDetail from './src/components/AuthorDetail/author-detail';
import PathDetail from './src/components/PathDetail/path-detail';
import ResetPassword from './src/components/Authentication/ResetPassword/reset-password';

import { ScreenName, ScreenTitle } from './src/globals/constants';
import { AuthenticationProvider } from './src/contexts/authentication-context';
import { ThemeProvider, ThemeContext } from './src/contexts/theme-context';
import { CoursesProvider } from './src/contexts/courses-context';
import { SearchProvider } from './src/contexts/search-context';
import { AuthorsProvider } from './src/contexts/authors-context';
import { PathsProvider } from './src/contexts/paths-context';
import { AccountsProvider } from './src/contexts/accounts-context';

axios.defaults.baseURL = "https://api.itedu.me";

const MainStack = createStackNavigator();

const MainNavigation = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <MainStack.Navigator initialRouteName={ScreenName.splashScreen}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
        }}>
            <MainStack.Screen name={ScreenName.splashScreen} component={SplashScreen} options={{ headerShown: false }} />
            <MainStack.Screen name={ScreenName.startScreen} component={StartScreen} options={{ headerShown: false }} />
            <MainStack.Screen name={ScreenName.login} component={Login} options={{ title: ScreenTitle.login }} />
            <MainStack.Screen name={ScreenName.register} component={Register} options={{ title: ScreenTitle.register }} />
            <MainStack.Screen name={ScreenName.forgetPassword} component={ForgetPassword} options={{ title: ScreenTitle.forgetPassword }} />
            <MainStack.Screen name={ScreenName.resetPassword} component={ResetPassword} options={{ title: ScreenTitle.resetPassword }} />
            <MainStack.Screen name={ScreenName.changePassword} component={ChangePassword} options={{ title: ScreenTitle.changePassword }} />
            <MainStack.Screen name={ScreenName.mainTab} component={MainTabNavigation} options={{ headerShown: false }} />
            <MainStack.Screen name={ScreenName.courseDetail} component={CourseDetail} options={{ headerShown: false }} />
            <MainStack.Screen name={ScreenName.authorDetail} component={AuthorDetail} options={{ title: ScreenTitle.authorDetail }} />
            <MainStack.Screen name={ScreenName.pathDetail} component={PathDetail} options={{ title: ScreenTitle.pathDetail }} />
        </MainStack.Navigator>
    )
}

export default function App() {
    return (
        <AccountsProvider>
            <AuthenticationProvider>
                <ThemeProvider>
                    <CoursesProvider>
                        <SearchProvider>
                            <AuthorsProvider>
                                <PathsProvider>
                                    <NavigationContainer>
                                        <MainNavigation />
                                    </NavigationContainer>
                                </PathsProvider>
                            </AuthorsProvider>
                        </SearchProvider>
                    </CoursesProvider>
                </ThemeProvider>
            </AuthenticationProvider>
        </AccountsProvider>
    );
}
