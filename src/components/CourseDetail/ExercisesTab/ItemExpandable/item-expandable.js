import React, { useState } from 'react';
import { StyleSheet, Text,  View, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

import { CommonStyles } from '../../../../globals/styles';

const ItemExpandable = (props) => {
    const data = props.data;
    const theme = props.theme;
    const [isExpand, setIsExpand] = useState(false);

    const renderExercise = (item) => {
        return <FlatList data={item.exercises}
            renderItem={({item}) => <Text style={[theme.titleColor, CommonStyles.fontSizeAverage, styles.exercise]}>&#8226;  {item.title}</Text>} />
    }

    return (
        <View style={[theme.background]}>
            <ListItem title={data.name} titleStyle={[theme.titleColor, CommonStyles.fontWeightBold]} titleProps={{numberOfLines: 1}}
                rightIcon={isExpand ? {name: "chevron-circle-up", type: "font-awesome", color: theme.inactiveTintColor, size: 14}
                    : {name: "chevron-circle-down", type: "font-awesome", color: theme.inactiveTintColor, size: 14}}
                containerStyle={[styles.item, theme.background]} onPress={() => setIsExpand(!isExpand)}/>
                <Divider style={styles.divider} />
            {isExpand && <FlatList data={data.lesson} renderItem={({item}) => renderExercise(item)} />}
        </View>
    )
}

export default ItemExpandable;

const styles = StyleSheet.create({
    item: {
        padding: 5
    },
    divider: {
        marginBottom: 5
    },
    exercise: {
        marginLeft: 10
    }
});