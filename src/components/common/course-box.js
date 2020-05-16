import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';

import CommonStyles from '../../globals/styles';
import Colors from '../../globals/constants/colors';

const CourseBox = (props) => {
    return (
        <View style={props.style}>
            <TouchableOpacity style={styles.container}>
                <Image style={styles.image} source={require("../../../assets/react.png")} />
                <View style={styles.descriptionContainer}>
                    <Text style={[CommonStyles.titleColor, CommonStyles.fontSizeAverage, CommonStyles.fontWeightBold]}>{props.title}</Text>
                    {props.author ? <Text style={CommonStyles.textColor}>{props.author}</Text> : null}
                    {props.course ? <Text style={CommonStyles.textColor}>{props.course} courses</Text> : null}
                    {props.date ? <Text style={CommonStyles.textColor}>{props.date}</Text> : null}
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
        width: 220,
        height: 180,
        backgroundColor: Colors.dimGrey
    },
    image: {
        width: 220,
        height: 100,
        resizeMode: 'stretch',
    },
    descriptionContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center"
    }
});
