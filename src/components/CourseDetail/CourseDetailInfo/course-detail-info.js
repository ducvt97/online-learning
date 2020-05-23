import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem, Rating, Divider } from 'react-native-elements';

import IconButton from '../../common/icon-button';
import Description from '../../common/description';
import ListCourses from '../../Courses/ListCourses/list-courses';
import CommonStyles from '../../../globals/styles';
import Colors from '../../../globals/constants/colors';


const CourseDetailInfo = (props) => {
    const data = props.data;
    return (
        <ScrollView>
            <View style={CommonStyles.generalContainer}>
                <Text style={[CommonStyles.titleColor, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{data.title}</Text>
                <ListItem containerStyle={[styles.authorButton, CommonStyles.shortMarginVertical]}
                    leftAvatar={{ source: require("../../../../assets/avatar.jpg") }}
                    title={data.author}
                    titleStyle={CommonStyles.titleColor}
                />
                <View style={[styles.rowContainer, CommonStyles.shortMarginVertical]}>
                    <Text style={CommonStyles.textColor}>{`${data.level} . ${data.date} . ${data.duration}`}</Text>
                    <Rating readonly style={styles.rating} tintColor={Colors.black} imageSize={15} startingValue={data.rating} fractions={0.75} />
                </View>
                <View style={[styles.rowContainer, styles.buttonGroup]}>
                    <IconButton name="bookmark" title="Bookmark" />
                    <IconButton name="cast" title="Add to channel" />
                    <IconButton type="font-awesome" name="download" title="Download" />
                </View>
                <Divider style={CommonStyles.divider} />
                <Description content={data.description} />
                <View>
                    <Text style={[CommonStyles.titleColor, CommonStyles.fontWeightBold, CommonStyles.fontSizeBig]}>Contents</Text>
                    <ListCourses data={data.contents} />
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
        padding: 2,
        backgroundColor: Colors.dimGrey
    },
    rating: {
        marginLeft: 10
    },
    buttonGroup: {
        justifyContent: "space-around"
    }
});