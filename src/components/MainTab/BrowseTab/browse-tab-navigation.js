import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseTab from './browse-tab';
import CoursesOfCategory from './CoursesOfCategory/courses-of-category';
import CoursesTopNew from './CoursesTopNew/courses-top-new';
import CoursesRecommend from './CoursesRecommend/courses-recommend';
import ListCourses from '../../Courses/ListCourses/list-courses';
import ListInstructors from '../../ListInstructors/list-instructors';

import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';

const BrowseTabStack = createStackNavigator();

const BrowseTabNavigation = (props) => {
    const {theme} = useContext(ThemeContext)
    return (
        <BrowseTabStack.Navigator initialRouteName={ScreenName.browseTab}
            screenOptions={{ headerStyle: theme.navigationHeader,
                headerTintColor: theme.tintColor
            }}
        >
            <BrowseTabStack.Screen name={ScreenName.browseTab} component={BrowseTab} options={{ headerTitle: ScreenTitle.browseTab }} />
            <BrowseTabStack.Screen name={ScreenName.coursesOfCategory} component={CoursesOfCategory} options={{ headerTitle: ScreenTitle.coursesOfCategory }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopNew} component={CoursesTopNew} options={{ headerTitle: ScreenTitle.coursesTopNew }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopSell} component={ListCourses} options={{ headerTitle: ScreenTitle.coursesTopSell }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopRate} component={ListCourses} options={{ headerTitle: ScreenTitle.coursesTopRate }} />
            <BrowseTabStack.Screen name={ScreenName.coursesRecommend} component={CoursesRecommend} options={{ headerTitle: ScreenTitle.coursesRecommend }} />
            <BrowseTabStack.Screen name={ScreenName.topInstructor} component={ListInstructors} options={{ headerTitle: ScreenTitle.topInstructor }} />
        </BrowseTabStack.Navigator>
    )
}

export default BrowseTabNavigation;
