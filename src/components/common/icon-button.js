import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '../../globals/constants';

const IconButton = (props) => {
    const theme = props.theme;
    return (
        <TouchableOpacity style={styles.container}>
            <Icon reverse type={props.type} name={props.name} color={Colors.dimGrey} reverseColor={Colors.white} />
            <Text style={[theme ? theme.titleColor : null, styles.title]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    }
});