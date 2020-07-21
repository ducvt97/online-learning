import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Divider } from 'react-native-elements';

import ListCoursesItem from '../../common/list-courses-item';
import { CommonStyles } from '../../../globals/styles';
import { ScreenName } from '../../../globals/constants';

const ListCourses = (props) => {
    const data = props.data || props.route.params.data;

    const onPressItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    return (
        <View style={[styles.container, props.style || props.route ? props.route.params.style : {}]}>
            <FlatList data={data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ListCoursesItem data={item} style={styles.item}
                    onPress={() => onPressItem(ScreenName.courseDetail, item.id)}
                    theme={props.theme || props.route.params.theme} />}
                ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
            />
        </View>
    )
}

export default ListCourses;

const styles = StyleSheet.create({
    container: {
        // paddingBottom: 40
    },
    item: {
        marginVertical: 10
    }
});
