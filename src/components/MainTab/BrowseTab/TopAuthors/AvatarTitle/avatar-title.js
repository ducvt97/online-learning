import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

import { CommonStyles } from '../../../../../globals/styles';

const AvatarTitle = (props) => {
    return (
        <View style={[props.style, styles.container]}>
            <TouchableOpacity onPress={() => props.onPressItem(props.screenName, props.itemId)}>
                <Avatar rounded source={require("../../../../../../assets/avatar.jpg")} size="large" />
                <Text style={[props.titleStyle, CommonStyles.fontSizeAverage, styles.title]}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AvatarTitle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        marginTop: 5,
        textAlign: "center"
    }
});
