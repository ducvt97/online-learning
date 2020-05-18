import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import Colors from '../../../globals/constants/colors';
import ListCoursesItem from '../ListCoursesItem/list-courses-item';
import { Divider } from 'react-native-elements';

const ListCourses = (props) => {
    return (
        <View style={styles.container}>
            <FlatList style={props.style} data={props.data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ListCoursesItem data={item} />}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            />
        </View>
    )
}

export default ListCourses;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40
    },
    divider: {
        marginTop: 10,
        backgroundColor: Colors.dimGrey
    }
});
