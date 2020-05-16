import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Colors from '../../../globals/constants/colors';
import ListCoursesItem from '../ListCoursesItem/list-courses-item';
import { Divider } from 'react-native-elements';

const ListCourses = (props) => {
    return (
        <FlatList style={props.style} data={props.data}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <ListCoursesItem data={item} />}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
    )
}

export default ListCourses;

const styles = StyleSheet.create({
    divider: {
        marginTop: 10,
        backgroundColor: Colors.dimGrey
    }
});
