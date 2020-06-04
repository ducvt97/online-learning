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
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Image style={styles.image} source={require("../../../assets/react.png")} />
                <View style={styles.descriptionContainer}>
                    <Text style={[theme ? theme.titleColor: {}, CommonStyles.fontSizeAverage, CommonStyles.fontWeightBold]}>{data.title}</Text>
                    {data.author ? <Text style={theme ? theme.textColor : {}}>{data.author}</Text> : null}
                    {data.course ? <Text style={theme ? theme.textColor : {}}>{data.course} courses</Text> : null}
                    <Text style={theme ? theme.textColor : {}}>
                        {data.level ? `${data.level} . ` : null}
                        {data.date ? `${data.date} . ` : null}
                        {data.duration ? `${data.duration}` : null}
                    </Text>
                    {data.rating ? <Rating readonly style={styles.rating} tintColor={theme ? theme.backgroundColor: null} imageSize={20} startingValue={data.rating} fractions={1} /> : null}
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
