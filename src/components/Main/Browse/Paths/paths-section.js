import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import CourseBox from '../../../common/course-box';

const PathsSection = (props) => {
    return (
        <View>
            <FlatList style={styles.listContainer} horizontal={true} data={props.data}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CourseBox style={styles.item} title={item.title} course={item.course} />} 
            />
        </View>
    )
}

export default PathsSection;

const styles = StyleSheet.create({
    listContainer: {
        marginBottom: 20
    },
    item: {
        marginRight: 10,
        marginBottom: 10
    }
});
