import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Divider } from 'react-native-elements';

import ListCoursesItem from '../../common/list-courses-item';
import { CommonStyles } from '../../../globals/styles';

const ListCourses = (props) => {
    return (
        <View style={styles.container}>
            <FlatList style={props.style} data={props.data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ListCoursesItem data={item} onPress={() => props.onPressItem(props.screenName, item.id)} theme={props.theme} />}
                ItemSeparatorComponent={() => <Divider style={CommonStyles.divider} />}
            />
        </View>
    )
}

export default ListCourses;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40
    }
});
