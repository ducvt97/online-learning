import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/components/Authentication/Login/login';
import ForgetPassword from './src/components/Authentication/ForgetPassword/forget-password';
import Register from './src/components/Authentication/Register/register';
import ChangePassword from './src/components/Authentication/ChangePassword/change-password';
import StartScreen from './src/components/Others/StartScreen/start-screen';
import SplashScreen from './src/components/Others/SplashScreen/splash-screen';
import MainTabNavigation from './src/components/MainTab/main-tab-navigation';
import CourseDetail from './src/components/CourseDetail/course-detail';

import { ScreenName, ScreenTitle } from './src/globals/constants';
import { AuthenticationProvider } from './src/contexts/authentication-context';
import { ThemeProvider, ThemeContext } from './src/contexts/theme-context';

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
            <MainStack.Screen name={ScreenName.changePassword} component={ChangePassword} options={{ title: ScreenTitle.changePassword  }} />
            <MainStack.Screen name={ScreenName.mainTab} component={MainTabNavigation} options={{ headerShown: false }} />
            <MainStack.Screen name={ScreenName.courseDetail} component={CourseDetail} options={{ headerShown: false }} />
        </MainStack.Navigator>
    )
}

export default function App() {
    return (
        <AuthenticationProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <MainNavigation />
                </NavigationContainer>
            </ThemeProvider>
        </AuthenticationProvider>
    );
}
