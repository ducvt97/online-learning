import React, { useState } from 'react';
import { StyleSheet, Text,  View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';

const ItemExpandable = (props) => {
    const data = props.data;
    const [isExpand, setIsExpand] = useState(false);
    const theme= props.theme;

    const onPressHeader = () => {
        setIsExpand(!isExpand)
    }

    return (
        <View style={[theme.background]}>
            <ListItem title={data.title} titleStyle={theme.titleColor} titleProps={{numberOfLines: 1}}
                rightIcon={isExpand ? {name: "chevron-circle-up", type: "font-awesome", color: theme.inactiveTintColor, size: 14}
                    : {name: "chevron-circle-down", type: "font-awesome", color: theme.inactiveTintColor, size: 14}}
                containerStyle={[styles.item, theme.background]} onPress={onPressHeader}/>
            {isExpand && <Text style={[theme.textColor, CommonStyles.fontSizeAverage, styles.item]}>{data.content}</Text>}
        </View>
    )
}

export default ItemExpandable;

const styles = StyleSheet.create({
    item: {
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});