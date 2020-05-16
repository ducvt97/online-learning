import React from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import AuthorsList from '../AuthorsList/authors-list';
import SectionHeader from '../../../common/section-header';

const TabAll = (props) => {
    const renderItem = (item) => {
        return item.type === 1 ? <ListCourses style={styles.section} data={item.data} />
            : item.type === 2 ? <ListCourses style={styles.section} data={item.data} />
            : item.type === 3 ? <AuthorsList style={styles.section} data={item.data} />
            : null;
    }
    
    return (
        <View>
            <SectionList sections={props.data} stickySectionHeadersEnabled={true}
                keyExtractor={(item) => item}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title, results } }) => (
                    <SectionHeader title={title} rightButton={results + " results >"} />
                )}
            />
        </View>
    )
}

export default TabAll;

const styles = StyleSheet.create({
    section: {
        marginBottom: 20
    }
});
