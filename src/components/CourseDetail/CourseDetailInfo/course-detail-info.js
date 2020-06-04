import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem, Rating, Divider } from 'react-native-elements';

import IconButton from '../../common/icon-button';
import Description from '../../common/description';
import ListCourses from '../../Courses/ListCourses/list-courses';

import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';


const CourseDetailInfo = (props) => {
    const data = props.data;
    const {theme} = useContext(ThemeContext);

    return (
        <ScrollView>
            <View style={[CommonStyles.generalContainer, theme.background]}>
                <Text style={[theme.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{data.title}</Text>
                <ListItem containerStyle={[styles.authorButton, theme.navigationHeader, CommonStyles.shortMarginVertical]}
                    leftAvatar={{ source: require("../../../../assets/avatar.jpg") }}
                    title={data.author}
                    titleStyle={theme.titleColor}
                />
                <View style={[styles.rowContainer, CommonStyles.shortMarginVertical]}>
                    <Text style={theme.textColor}>{`${data.level} . ${data.date} . ${data.duration}`}</Text>
                    <Rating readonly style={styles.rating} tintColor={theme.backgroundColor} imageSize={15} startingValue={data.rating} fractions={0.75} />
                </View>
                <View style={[styles.rowContainer, styles.buttonGroup]}>
                    <IconButton name="bookmark" title="Bookmark" theme={theme} />
                    <IconButton name="cast" title="Add to channel" theme={theme} />
                    <IconButton type="font-awesome" name="download" title="Download" theme={theme} />
                </View>
                <Divider style={CommonStyles.divider} />
                <Description style={theme.textColor} content={data.description} />
                <View>
                    <Text style={[theme.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}>Contents</Text>
                    <ListCourses data={data.contents} theme={theme} />
                </View>
            </View>
        </ScrollView>
    )
}

export default CourseDetailInfo;

const styles = StyleSheet.create({
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