import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';

const NotFoundView = (props) => {
    const theme = props.theme;
    return (
        <View style={styles.container}>
            {props.showIcon && <Icon name="search" size={80} color={theme ? theme.tintColor : null} />}
            <Text style={[theme ? theme.titleColor : {}, styles.text, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{props.title ? props.title : "No results"}</Text>
            <Text style={[theme ? theme.textColor : {}, styles.text, CommonStyles.fontSizeBig]}>{props.subtitle}</Text>
        </View>
    )
}

export default NotFoundView;

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10
    },
    text: {
        marginTop: 10,
        textAlign: "center",
        lineHeight: 20
    }
});
