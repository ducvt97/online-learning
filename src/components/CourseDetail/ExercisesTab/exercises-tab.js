import React, { useContext } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import {  Divider } from 'react-native-elements';

import ItemExpandable from './ItemExpandable/item-expandable';
import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';

const ExercisesTab = (props) => {
    const {theme} = useContext(ThemeContext);

    return <View style={[theme.background, CommonStyles.flex]}>
    {
        props.dataLoading ? <ActivityIndicator color={theme.tintColor} />
        : props.errMsgLoading ? <Text>{props.errMsgLoading}</Text>
            : <FlatList data={props.state.courseSection} showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <ItemExpandable data={item} theme={theme} />}
                ItemSeparatorComponent={() => <Divider style={[CommonStyles.divider, styles.divider]} />} />
    }
    </View>
}

export default ExercisesTab;

const styles = StyleSheet.create({
    divider: {
        marginVertical: 0
    },
    item: {
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});