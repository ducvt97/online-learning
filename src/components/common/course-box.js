import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Rating } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';

const CourseBox = (props) => {
    data = props.data;

    return (
        <View style={props.style}>
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Image style={styles.image} source={require("../../../assets/react.png")} />
                <View style={styles.descriptionContainer}>
                    <Text style={[{color: Colors.white}, CommonStyles.fontWeightBold]} numberOfLines={2}>{data.title}</Text>
                    {data.author ? <Text style={[{color: Colors.gainsboro}, CommonStyles.fontSizeSmall]} numberOfLines={1}>{data.author}</Text> : null}
                    {data.course ? <Text style={[{color: Colors.gainsboro}, CommonStyles.fontSizeSmall]} numberOfLines={1}>{data.course} courses</Text> : null}
                    <Text style={[{color: Colors.gainsboro}, CommonStyles.fontSizeSmall]} numberOfLines={1}>
                        {data.level ? `${data.level} . ` : null}
                        {data.date ? `${data.date} . ` : null}
                        {data.duration ? `${data.duration}` : null}
                    </Text>
                    {data.rating ? <Rating readonly tintColor={Colors.dimGrey} imageSize={15} startingValue={data.rating} fractions={0.75} /> : null}
                </View>
            </TouchableOpacity>
        </View>
    )
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
        resizeMode: 'stretch',
    },
    descriptionContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "flex-start"
    }
});
