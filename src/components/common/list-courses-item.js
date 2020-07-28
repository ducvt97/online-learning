import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Rating } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';

const ListCoursesItem = (props) => {
    const data = props.data;
    const theme = props.theme;

    return <View style={props.style}>
        <TouchableOpacity style={styles.container} onPress={props.onPress} activeOpacity={props.noActiveOpacity ? 1 : 0.4}>
            <Image style={[styles.image, {backgroundColor: theme.tintColor}]} source={{uri: data.courseImage || data.imageUrl}} />
            <View style={styles.descriptionContainer}>
                <Text style={[theme ? theme.titleColor: {}, CommonStyles.fontSizeAverage, CommonStyles.fontWeightBold]} numberOfLines={2}>{data.courseTitle || data.title}</Text>
                {data.instructorName ? <Text style={theme ? theme.textColor : {}}>{data.instructorName}</Text> : null}
                {props.useForHeader ? <Text style={theme ? theme.textColor : {}} numberOfLines={1}>{data.totalHours}</Text> : null}
                {!props.useForHeader ? <View>
                    {typeof(data.coursePrice) === "number" || typeof(data.price) === "number"
                    ? <Text style={{color: Colors.green}}>{typeof(data.coursePrice) === "number" ? data.coursePrice : data.price} đ</Text> : null}
                    {data.createdAt || data.totalHours ? <Text style={theme ? theme.textColor : {}} numberOfLines={1}>
                        {data.createdAt ? `${new Date(data.createdAt).toDateString()} . ` : null}
                        {data.totalHours ? `${data.totalHours} hours` : null}
                    </Text> : null}
                    {typeof(data.courseAveragePoint) === "number" || (typeof(data.courseAveragePoint) === "number" && typeof(data.formalityPoint) === "number" && typeof(data.formalityPoint) === "number") ?
                        <Rating readonly style={styles.rating} tintColor={theme ? theme.backgroundColor: null} imageSize={20} fractions={1}
                            startingValue={typeof(data.courseAveragePoint) === "number" ? data.courseAveragePoint : ((data.formalityPoint + data.contentPoint + data.presentationPoint) / 3)} />
                    : null}
                </View> : null}
            </View>
        </TouchableOpacity>
    </View>
}

export default ListCoursesItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10,
        backgroundColor: Colors.transparent
    },
    image: {
        width: 120,
        height: 70,
        resizeMode: "stretch",
    },
    descriptionContainer: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: "flex-start"
    },
    rating: {
        marginTop: 5,
        alignSelf: "flex-start"
    }
});
