import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import CommonStyles from '../../globals/styles';
import Colors from '../../globals/constants/colors';

const IconButton = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Icon reverse type={props.type} name={props.name} color={Colors.dimGrey} reverseColor={Colors.white} />
            <Text style={[CommonStyles.titleColor, styles.title]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    }
});