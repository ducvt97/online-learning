import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CommonStyles from '../../globals/styles';
import Colors from '../../globals/constants/colors';

const SectionHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.titleColor]}>{props.title}</Text>
            {props.rightButton ? <Text style={CommonStyles.titleColor}>{props.rightButton}</Text> : null}
        </View>
    )
}

export default SectionHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
