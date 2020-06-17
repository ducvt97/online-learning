import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { CommonStyles } from '../../globals/styles';

const ListEmptyBox = (props) => {
    const theme = props.theme;
    const icon = props.icon;

    return (
        <View style={[styles.container, theme ? theme.navigationHeader : {}]}>
            {icon ? <Icon name={icon.name} type={icon.type} size={icon.size} color={theme ? theme.tintColor : null} /> : null}
            <Text style={[theme ? theme.textColor : {}, CommonStyles.fontSizeAverage, styles.content]}>{props.content}</Text>
        </View>
    )
}

export default ListEmptyBox;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        maxHeight: 250,
        minHeight: 150
    },
    content: {
        marginTop: 10,
        textAlign: "center"
    }
});
