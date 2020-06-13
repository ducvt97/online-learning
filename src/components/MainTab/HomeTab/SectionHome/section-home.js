import React, { useContext } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import ListCoursesHorizontal from '../../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import SectionHeader from '../../../common/section-header';

import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { CoursesContext } from '../../../../contexts/courses-context';

const SectionHome = (props) => {
    const {theme} = useContext(ThemeContext);
    const {courses} = useContext(CoursesContext);

    const onPressListCoursesItem = () => {
        props.navigation.navigate(ScreenName.courseDetail);
    }

    const renderItem = (item) => {
        return item.type === 1 ? <ListCoursesHorizontal data={courses} navigation={props.navigation} screenName={ScreenName.courseDetail} onPressItem={onPressListCoursesItem} />
            : item.type === 2 ? <ListCoursesHorizontal data={item.data} onPressItem={onPressListCoursesItem} />
            : item.type === 3 ? <ListCoursesHorizontal data={item.data} onPressItem={onPressListCoursesItem} />
            : item.type === 4 ? <ListCoursesHorizontal data={item.data} onPressItem={onPressListCoursesItem} />
            : null;
    }

    const renderSectionHeader = (title, data) => {
        return data[0].data.length > 0 ? 
            <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor}
                rightButtonTitle="See all >" rightButtonTitleStyle={theme.titleColor} />
            : <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor} />
    }

    return (
        <View style={[styles.container, theme.background]}>
            <SectionList sections={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title, data } }) => renderSectionHeader(title, data)}
            />
        </View>
    )
}

export default SectionHome;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
