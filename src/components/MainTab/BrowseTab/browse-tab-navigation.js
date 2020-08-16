import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseTab from './browse-tab';
import CoursesOfCategory from './CoursesOfCategory/courses-of-category';
import CoursesTopNew from './CoursesTopNew/courses-top-new';
import CoursesRecommend from './CoursesRecommend/courses-recommend';
import ListCourses from '../../Courses/ListCourses/list-courses';
import ListInstructors from '../../ListInstructors/list-instructors';

import { ScreenName } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import { LanguageContext } from '../../../contexts/language-context';

const BrowseTabStack = createStackNavigator();

const BrowseTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    return (
        <BrowseTabStack.Navigator initialRouteName={ScreenName.browseTab}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
            }}
        >
            <BrowseTabStack.Screen name={ScreenName.browseTab} component={BrowseTab} options={{ headerTitle: langContext.state.translation.screenTitle.browseTab }} />
            <BrowseTabStack.Screen name={ScreenName.coursesOfCategory} component={CoursesOfCategory} options={{ headerTitle: langContext.state.translation.screenTitle.coursesOfCategory }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopNew} component={CoursesTopNew} options={{ headerTitle: langContext.state.translation.screenTitle.coursesTopNew }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopSell} component={ListCourses} options={{ headerTitle: langContext.state.translation.screenTitle.coursesTopSell }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopRate} component={ListCourses} options={{ headerTitle: langContext.state.translation.screenTitle.coursesTopRate }} />
            <BrowseTabStack.Screen name={ScreenName.coursesRecommend} component={CoursesRecommend} options={{ headerTitle: langContext.state.translation.screenTitle.coursesRecommend }} />
            <BrowseTabStack.Screen name={ScreenName.topInstructor} component={ListInstructors} options={{ headerTitle: langContext.state.translation.screenTitle.topInstructor }} />
        </BrowseTabStack.Navigator>
    )
}

export default BrowseTabNavigation;
