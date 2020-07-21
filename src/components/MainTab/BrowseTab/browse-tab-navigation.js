import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrowseTab from './browse-tab';
import CoursesTopNew from './CoursesTopNew/courses-top-new';
import CoursesRecommend from './CoursesRecommend/courses-recommend';
import ListCourses from '../../Courses/ListCourses/list-courses';
import ListAuthors from '../../ListAuthors/list-authors';

import { ScreenName, ScreenTitle } from '../../../globals/constants';
import { ThemeContext } from '../../../contexts/theme-context';
import AuthorDetail from '../../AuthorDetail/author-detail';

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
            <BrowseTabStack.Screen name={ScreenName.coursesTopNew} component={CoursesTopNew} options={{ headerTitle: ScreenTitle.coursesTopNew }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopSell} component={ListCourses} options={{ headerTitle: ScreenTitle.coursesTopSell }} />
            <BrowseTabStack.Screen name={ScreenName.coursesTopRate} component={ListCourses} options={{ headerTitle: ScreenTitle.coursesTopRate }} />
            <BrowseTabStack.Screen name={ScreenName.coursesRecommend} component={CoursesRecommend} options={{ headerTitle: ScreenTitle.coursesRecommend }} />
            <BrowseTabStack.Screen name={ScreenName.topInstructor} component={ListAuthors} options={{ headerTitle: ScreenTitle.topInstructor }} />
        </BrowseTabStack.Navigator>
    )
}

export default BrowseTabNavigation;
