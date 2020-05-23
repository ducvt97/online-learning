import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';

import CommonStyles from '../../globals/styles';
import Colors from '../../globals/constants/colors';

const Description = (props) => {
    const [extended, setExtended] = useState(false);
    const onPress = () => {
        setExtended(extended => !extended);
    }

    return (
        <View style={styles.container}>
            <Text style={[CommonStyles.textColor, styles.text]} numberOfLines={extended ? null : 3}>{props.content}</Text>
            <Text style={[styles.textButton]} onPress={() => onPress()}>{extended ? "Less" : "More"}</Text>
            <Divider style={CommonStyles.divider} />
        </View>
    )
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