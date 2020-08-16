import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Rating } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';
import { LanguageContext } from '../../contexts/language-context';

const CourseBox = (props) => {
    const data = props.data;
    const langContext = useContext(LanguageContext);

    return data ? <View style={props.style}>
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Image style={[styles.image, {backgroundColor: Colors.dark}]} source={{uri: data.courseImage || data.imageUrl}} />
                <View style={styles.descriptionContainer}>
                    <Text style={[{color: Colors.white}, CommonStyles.fontWeightBold]} numberOfLines={2}>{data.courseTitle || data.title}</Text>
                    {data.instructorName ? <Text style={[{color: Colors.gainsboro}, CommonStyles.fontSizeSmall]} numberOfLines={1}>{data.instructorName}</Text> : null}
                    {typeof(data.coursePrice) === "number" || typeof(data.price) === "number"
                    ? <Text style={{color: Colors.red}}>{typeof(data.coursePrice) === "number" ? data.coursePrice : data.price} đ</Text> : null}
                    {data.createdAt || data.totalHours ? <Text style={[{color: Colors.gainsboro}, CommonStyles.fontSizeSmall]} numberOfLines={1}>
                        {data.createdAt ? `${new Date(data.createdAt).toDateString()} . ` : null}
                        {data.totalHours ? `${data.totalHours} ${langContext.state.translation["hour"]}` : null}
                    </Text> : null}
                    {typeof(data.courseAveragePoint) === "number" || (typeof(data.courseAveragePoint) === "number" && typeof(data.formalityPoint) === "number" && typeof(data.formalityPoint) === "number") ?
                        <Rating readonly tintColor={Colors.dimGrey} imageSize={15} 
                            startingValue={typeof(data.courseAveragePoint) === "number" ? data.courseAveragePoint
                                : ((data.formalityPoint + data.contentPoint + data.presentationPoint) / 3)}
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
        height: 200,
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
