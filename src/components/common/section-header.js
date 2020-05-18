import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CommonStyles from '../../globals/styles';
import Colors from '../../globals/constants/colors';
import { Button } from 'react-native-elements';

const SectionHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, CommonStyles.titleColor]}>{props.title}</Text>
            {props.rightButtonTitle ? <Button type="clear" title={props.rightButtonTitle} titleStyle={props.rightButtonTitleStyle} /> : null}
        </View>
    )
}

export default SectionHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.black
    }
});
