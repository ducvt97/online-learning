import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

import { CommonStyles } from '../../../../../globals/styles';

const AvatarTitle = (props) => {
    return <TouchableOpacity style={[styles.container, props.size ? styles[props.size] : {}, props.style]} onPress={props.onPressItem}>
        <Avatar rounded source={{uri: props.imageUrl}} size={props.size} />
        <Text style={[CommonStyles.fontSizeAverage, styles.title, props.titleStyle]} numberOfLines={1}>{props.title}</Text>
    </TouchableOpacity>
}

export default AvatarTitle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginTop: 5,
        textAlign: "center"
    },
    small: {
        maxWidth: 80
    },
    medium: {
        maxWidth: 100
    },
    large: {
        maxWidth: 120
    }
});
