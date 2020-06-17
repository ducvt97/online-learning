import React, { useContext } from 'react';
import { Text, ScrollView, SectionList } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

import Description from '../common/description';
import ListCourses from '../Courses/ListCourses/list-courses';

import { CommonStyles } from '../../globals/styles';
import { ThemeContext } from '../../contexts/theme-context';
import { ScreenName } from '../../globals/constants';
import { PathsContext } from '../../contexts/paths-context';

const PathDetail = (props) => {
    const pathId = props.route.params.itemId;
    const {theme} = useContext(ThemeContext);
    const {getPathById} = useContext(PathsContext);
    const path = getPathById(pathId);

    const section = [
        { title: "Beginner", data: [path.courses.beginner] },
        { title: "Intermediate", data: [path.courses.intermediate] },
        { title: "Advanced", data: [path.courses.advanced] }
    ]

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return (
        <ScrollView style={[CommonStyles.generalContainer, theme.background]} nestedScrollEnabled >
            <ListItem containerStyle={theme.background} subtitleStyle={theme.textColor}
                titleStyle={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}
                title={path.title}
                subtitle={`${path.numberOfCourses} courses   ${path.duration}`}
                leftAvatar={{ source: path.image }}
            />
            <Description style={theme.textColor} content={path.description} />
            <SectionList sections={section} stickySectionHeadersEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ListCourses data={item} theme={theme} screenName={ScreenName.courseDetail} onPressItem={onPressListItem} />}
                renderSectionHeader={({ section: { title } }) => <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, theme.background]}>{title}</Text>}
                ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
            />
        </ScrollView>
    )
}

export default PathDetail;
