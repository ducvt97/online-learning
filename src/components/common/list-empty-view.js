import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { LanguageContext } from '../../contexts/language-context';

const ListEmptyView = (props) => {
    const theme = props.theme;
    const langContext = useContext(LanguageContext);

    return (
        <View style={[styles.container, theme.background]}>
            {props.showIcon && <Icon name={props.iconName} type={props.iconType} size={80} color={theme ? theme.tintColor : null} />}
            <Text style={[theme ? theme.titleColor : {}, styles.text, CommonStyles.fontSizeBig, CommonStyles.fontWeightBold]}>{props.title ? props.title : langContext.state.translation["noResult"]}</Text>
            <Text style={[theme ? theme.textColor : {}, styles.text, CommonStyles.fontSizeBig]}>{props.subtitle}</Text>
        </View>
    )
}

export default ListEmptyView;

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    text: {
        marginTop: 10,
        textAlign: "center",
        lineHeight: 20
    }
});
