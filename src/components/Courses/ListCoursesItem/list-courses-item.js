import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';

import CommonStyles from '../../../globals/styles';
import Colors from '../../../globals/constants/colors';
import { Rating } from 'react-native-elements';

const ListCoursesItem = (props) => {
    const data = props.data;
    return (
        <View style={props.style}>
            <TouchableOpacity style={styles.container}>
                <Image style={styles.image} source={require("../../../../assets/react.png")} />
                <View style={styles.descriptionContainer}>
                    <Text style={[CommonStyles.titleColor, CommonStyles.fontSizeAverage, CommonStyles.fontWeightBold]}>{data.title}</Text>
                    {data.author ? <Text style={CommonStyles.textColor}>{data.author}</Text> : null}
                    {data.course ? <Text style={CommonStyles.textColor}>{data.course} courses</Text> : null}
                    <Text style={CommonStyles.textColor}>
                        {data.level ? `${data.level} . ` : null}
                        {data.date ? `${data.date} . ` : null}
                        {data.duration ? `${data.duration}` : null}
                    </Text>
                    {data.rating ? <Rating readonly style={styles.rating} tintColor={Colors.black} imageSize={20} startingValue={data.rating} fractions={1} /> : null}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ListCoursesItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: Colors.transparent
    },
    image: {
        width: 120,
        height: 70,
        resizeMode: 'stretch',
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
