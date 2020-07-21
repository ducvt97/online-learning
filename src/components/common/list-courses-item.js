import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Rating } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';

const ListCoursesItem = (props) => {
    const data = props.data;
    const theme = props.theme;

    return (
        <View style={props.style}>
            <TouchableOpacity style={styles.container} onPress={props.onPress} activeOpacity={props.noActiveOpacity ? 1 : 0.4}>
                <Image style={[styles.image, {backgroundColor: theme.tintColor}]} source={{uri: data.imageUrl}} />
                <View style={styles.descriptionContainer}>
                    <Text style={[theme ? theme.titleColor: {}, CommonStyles.fontSizeAverage, CommonStyles.fontWeightBold]} numberOfLines={2}>{data.title}</Text>
                    {data.instructorName ? <Text style={theme ? theme.textColor : {}}>{data.instructorName}</Text> : null}
                    <Text style={{color: Colors.green}}>{data.price} đ</Text>
                    <Text style={theme ? theme.textColor : {}} numberOfLines={1}>
                        {data.createdAt ? `${new Date(data.createdAt).toDateString()} . ` : null}
                        {data.totalHours ? `${data.totalHours} hours` : null}
                    </Text>
                    <Rating readonly style={styles.rating} tintColor={theme ? theme.backgroundColor: null} imageSize={20} fractions={1}
                        startingValue={data.courseAveragePoint ? data.courseAveragePoint : ((data.formalityPoint + data.contentPoint + data.presentationPoint) / 3)} />
                </View>
            </TouchableOpacity>
        </View>
    )
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
        marginTop: 5
    }
});
