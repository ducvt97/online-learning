import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import CourseBox from '../../common/course-box';

const ListCoursesHorizontal = (props) => {
    const onPressItem = (courseId) => {
        props.navigation.navigate(props.screenName, {courseId: courseId});
    }

    return (
        <View style={styles.container}>
            <FlatList style={props.style} horizontal={true} data={props.data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CourseBox style={styles.item} data={item} navigation={props.navigation} onPress={() => onPressItem(item.id)} />}
            />
        </View>
    )
}

export default ListCoursesHorizontal;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    item: {
        marginRight: 10,
        marginBottom: 10
    }
});
