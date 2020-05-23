import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './src/components/Authentication/Login/login';
import ForgetPassword from './src/components/Authentication/ForgetPassword/forget-password';
import Register from './src/components/Authentication/Register/register';
import ChangePassword from './src/components/Authentication/ChangePassword/change-password';
import Browse from './src/components/Main/Browse/browse';
import Search from './src/components/Main/Search/search';

import Colors from './src/globals/constants/colors';
import ListCourses from './src/components/Courses/ListCourses/list-courses';
import SearchData from './src/raw-data/search';
import Download from './src/components/Main/Download/download';
import Home from './src/components/Main/Home/home';
import CourseDetail from './src/components/CourseDetail/course-detail';
import Profile from './src/components/AccountManagement/Profile/profile';
import Setting from './src/components/AccountManagement/Setting/setting';
import StartScreen from './src/components/Others/StartScreen/start-screen';
import SplashScreen from './src/components/Others/SplashScreen/splash-screen';
import VerifyPassword from './src/components/Authentication/VerifyPassword/verify-password';

export default function App() {
    return (
        <View style={styles.container}>
            <StartScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
});
