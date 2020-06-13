import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ListItem, Rating, Divider, Icon } from 'react-native-elements';

import IconButton from '../../common/icon-button';
import Description from '../../common/description';

import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';
import { CoursesContext } from '../../../contexts/courses-context';
import { Colors } from '../../../globals/constants';

const CourseDetailInfo = (props) => {
    const course = props.data;
    const {theme} = useContext(ThemeContext);
    const {toggleBookmarkedCourse} = useContext(CoursesContext);
    const [bookmarked, setBookmarked] = useState(course.bookmarked);

    const onPressBookmark = (courseId) => {
        toggleBookmarkedCourse(courseId);
        setBookmarked(!bookmarked);
    }

    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{course.title}</Text>
            <ListItem containerStyle={[styles.authorButton, theme.navigationHeader, CommonStyles.shortMarginVertical]}
                leftAvatar={{ source: require("../../../../assets/avatar.jpg") }}
                title={course.author} titleStyle={theme.titleColor}
            />
            <View style={[styles.rowContainer, CommonStyles.shortMarginVertical]}>
                <Text style={theme.textColor}>
                    {`${course.level} . ${course.date} . ${course.duration}`}
                </Text>
                <Rating readonly style={styles.rating} tintColor={theme.backgroundColor} imageSize={15}
                    startingValue={course.rating} fractions={0.75} />
            </View>
            <View style={[styles.rowContainer, styles.buttonGroup]}>
                <TouchableOpacity style={styles.iconButton} onPress={() => onPressBookmark(course.id)}>
                    <Icon reverse type={props.type} name="bookmark" color={Colors.dimGrey} reverseColor={Colors.white} />
                    <Text style={theme.titleColor}>{bookmarked ? "Bookmarked" : "Bookmark"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon reverse name="cast" color={Colors.dimGrey} reverseColor={Colors.white} />
                    <Text style={theme.titleColor}>Add to channel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon reverse type="font-awesome" name="download" color={Colors.dimGrey} reverseColor={Colors.white} />
                    <Text style={theme.titleColor}>{course.downloaded ? "Downloaded" : "Download"}</Text>
                </TouchableOpacity>
            </View>
            <Divider style={CommonStyles.divider} />
            <Description style={theme.textColor} content={course.description} />
        </View>
    )
}

export default CourseDetailInfo;

const styles = StyleSheet.create({
    iconButton: {
        alignItems: "center"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    authorButton: {
        marginTop: 10,
        borderRadius: 30,
        maxWidth: 180,
        maxHeight: 40,
        padding: 2
    },
    rating: {
        marginLeft: 10
    },
    buttonGroup: {
        justifyContent: "space-around"
    }
});