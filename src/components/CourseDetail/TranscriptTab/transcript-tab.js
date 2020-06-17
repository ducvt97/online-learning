import React, { useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import {  Divider } from 'react-native-elements';

import ItemExpandable from './ItemExpandable/item-expandable';
import { CommonStyles } from '../../../globals/styles';
import { ThemeContext } from '../../../contexts/theme-context';

const TranscriptTab = (props) => {
    const {theme} = useContext(ThemeContext);

    return (
        <View style={[theme.background, {flex:1}]}>
            <FlatList data={props.data} showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <ItemExpandable data={item} theme={theme} />}
                ItemSeparatorComponent={() => <Divider style={[CommonStyles.divider, styles.divider]} />}
            />
        </View>
    )
}

export default TranscriptTab;

const styles = StyleSheet.create({
    divider: {
        marginVertical: 0
    },
    item: {
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});