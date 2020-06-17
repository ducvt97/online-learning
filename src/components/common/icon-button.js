import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '../../globals/constants';

const IconButton = (props) => {
    const theme = props.theme;
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Icon reverse type={props.type} name={props.name} color={Colors.dimGrey} reverseColor={Colors.white} />
            <Text style={theme ? theme.titleColor : null}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    }
});