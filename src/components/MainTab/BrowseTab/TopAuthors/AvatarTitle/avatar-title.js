import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

import { CommonStyles } from '../../../../../globals/styles';

const AvatarTitle = (props) => {
    return <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPressItem}>
        <Avatar rounded source={{uri: props.imageUrl}} size="large" />
        <Text style={[props.titleStyle, CommonStyles.fontSizeAverage, styles.title]} numberOfLines={1}>{props.title}</Text>
    </TouchableOpacity>
}

export default AvatarTitle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 120
    },
    title: {
        marginTop: 5,
        textAlign: "center"
    }
});
