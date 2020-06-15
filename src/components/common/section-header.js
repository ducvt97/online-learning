import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { CommonStyles } from '../../globals/styles';

const SectionHeader = (props) => {
    return (
        <View style={[props.style, styles.container]}>
            <Text style={[CommonStyles.fontSizeBig, CommonStyles.fontWeightBold, props.titleStyle]}>{props.title}</Text>
            {props.rightButtonTitle ? 
                <Button type="clear" title={props.rightButtonTitle} 
                    titleStyle={[props.rightButtonTitleStyle, CommonStyles.fontSizeAverage]} 
                    onPress={props.onPressRightButton}/> 
            : null}
        </View>
    )
}

export default SectionHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});
