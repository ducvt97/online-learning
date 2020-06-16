import React, { useContext } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import ListCoursesHorizontal from '../../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import SectionHeader from '../../../common/section-header';
import ListEmptyView from '../../../common/list-empty-view';

import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { CoursesContext } from '../../../../contexts/courses-context';
import { getBookmarkedCourses } from '../../../../core/services/courses-services';
import { PathsContext } from '../../../../contexts/paths-context';

const SectionHome = (props) => {
    const {theme} = useContext(ThemeContext);
    const {courses} = useContext(CoursesContext);
    const {paths} = useContext(PathsContext);

    const section = [
        {
            title: "Continue learning",
            data: [{ type: 1, data: courses}]
        },
        {
            title: "My Paths",
            data: [{ type: 2, data: paths}]
        },
        {
            title: "My channels",
            data: [{ type: 3, data: []}]
        },
        {
            title: "Bookmarks",
            data: [{ type: 4, data: getBookmarkedCourses()}]
        }
    ]

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    const renderItem = (item) => {
        return item.type === 1 ? item.data.length > 0 ?
            <ListCoursesHorizontal data={item.data} screenName={ScreenName.courseDetail} onPressItem={onPressListItem} />
            : <ListEmptyView theme={theme} icon={{name: "school", size: 30}} content="Start learning to improve your skills." />
        : item.type === 2 ? item.data.length > 0 ?
            <ListCoursesHorizontal data={item.data} screenName={ScreenName.pathDetail} onPressItem={onPressListItem} />
            : <ListEmptyView theme={theme} icon={{name: "extension", size: 30}} content="Use paths to have an overview in a field." />
        : item.type === 3 ? item.data.length > 0 ?
            <ListCoursesHorizontal data={item.data} onPressItem={onPressListItem} />
            : <ListEmptyView theme={theme} icon={{name: "cast", size: 30}} content="Use channels to save, organize, and share content to accomplish your learning objectives." />
        : item.type === 4 ? item.data.length > 0 ?
            <ListCoursesHorizontal data={item.data} screenName={ScreenName.courseDetail} onPressItem={onPressListItem} />
            : <ListEmptyView theme={theme} icon={{name: "bookmark", size: 30}} content="Use bookmarks to quickly save courses for later." />
        : null;
    }

    const renderSectionHeader = (title, data) => {
        return data[0].data.length > 0 ? 
            <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor}
                rightButtonTitle="See all >" rightButtonTitleStyle={theme.titleColor} />
            : <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor} />
    }

    return <View style={[styles.container, theme.background]}>
        <SectionList sections={section}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItem(item)}
            renderSectionHeader={({ section: { title, data } }) => renderSectionHeader(title, data)}
        />
    </View>
}

export default SectionHome;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    }
});
