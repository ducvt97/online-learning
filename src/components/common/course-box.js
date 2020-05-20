import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Rating } from 'react-native-elements';

import CommonStyles from '../../globals/styles';
import Colors from '../../globals/constants/colors';

const CourseBox = (props) => {
    data = props.data;

    return (
        <View style={props.style}>
            <TouchableOpacity style={styles.container}>
                <Image style={styles.image} source={require("../../../assets/react.png")} />
                <View style={styles.descriptionContainer}>
                    <Text style={[CommonStyles.titleColor, CommonStyles.fontSizeAverage, CommonStyles.fontWeightBold]}>{data.title}</Text>
                    {data.author ? <Text style={CommonStyles.textColor}>{data.author}</Text> : null}
                    {data.course ? <Text style={CommonStyles.textColor}>{data.course} courses</Text> : null}
                    <Text style={CommonStyles.textColor}>
                        {data.level ? `${data.level} . ` : null}
                        {data.date ? `${data.date} . ` : null}
                        {data.duration ? `${data.duration}` : null}
                    </Text>
                    {data.rating ? <Rating readonly tintColor={Colors.dimGrey} imageSize={20} startingValue={data.rating} fractions={1} /> : null}
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
        width: 250,
        height: 200,
        backgroundColor: Colors.dimGrey
    },
    image: {
        width: 250,
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
