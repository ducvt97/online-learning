import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Rating } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';

const CourseBox = (props) => {
    const data = props.data;

    return data ? <View style={props.style}>
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Image style={[styles.image, {backgroundColor: Colors.dark}]} source={{uri: data.courseImage || data.imageUrl}} />
                <View style={styles.descriptionContainer}>
                    <Text style={[{color: Colors.white}, CommonStyles.fontWeightBold]} numberOfLines={2}>{data.courseTitle || data.title}</Text>
                    {data.instructorName ? <Text style={[{color: Colors.gainsboro}, CommonStyles.fontSizeSmall]} numberOfLines={1}>{data.instructorName}</Text> : null}
                    <Text style={[{color: Colors.red}, CommonStyles.fontSizeSmall]} numberOfLines={1}>{data.coursePrice || data.price} đ</Text>
                    <Text style={[{color: Colors.gainsboro}, CommonStyles.fontSizeSmall]} numberOfLines={1}>
                        {data.createdAt ? `${new Date(data.createdAt).toDateString()} . ` : null}
                        {data.totalHours ? `${data.totalHours} hours` : null}
                    </Text>
                    {data.courseAveragePoint || data.courseAveragePoint === 0 || data.formalityPoint || data.formalityPoint === 0 ?
                        <Rating readonly tintColor={Colors.dimGrey} imageSize={15} 
                            startingValue={data.courseAveragePoint ? data.courseAveragePoint : ((data.formalityPoint + data.contentPoint + data.presentationPoint) / 3)}
                            fractions={0.75} />
                        : null}
                </View>
            </TouchableOpacity>
        </View>
    : null;
}

export default CourseBox;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: 200,
        height: 190,
        backgroundColor: Colors.dimGrey
    },
    image: {
        width: 200,
        height: 100,
        resizeMode: "stretch"
    },
    descriptionContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "flex-start"
    }
});
