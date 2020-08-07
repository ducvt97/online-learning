import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';
import { Colors } from '../../globals/constants';
import { LanguageContext } from '../../contexts/language-context';

const Description = (props) => {
    const [extended, setExtended] = useState(false);
    const langContext = useContext(LanguageContext);

    const onPress = () => {
        setExtended(extended => !extended);
    }

    return props.content ?
        <View style={[styles.container, props.style]}>
            <Text style={[props.theme ? props.theme.textColor : {}, styles.text]} numberOfLines={extended ? null : 3}>{props.content}</Text>
            <Text style={[styles.textButton]} onPress={() => onPress()}>{extended ? langContext.state.translation["less"] : langContext.state.translation["more"]}</Text>
            <Divider style={CommonStyles.divider} />
        </View>
    : null;
}

export default Description;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    text: {
        lineHeight: 20
    },
    textButton: {
        marginTop: 5,
        color: Colors.dodgerBlue
    }
});