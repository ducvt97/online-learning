import React from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import ListCourses from '../../../Courses/ListCourses/list-courses';
import AuthorsList from '../AuthorsList/authors-list';
import SectionHeader from '../../../common/section-header';

import CommonStyles from '../../../../globals/styles';
import SearchData from '../../../../raw-data/search';
import { ScreenName } from '../../../../globals/constants';

const SearchAllTab = (props) => {
    const data = SearchData;

    const onPressListCoursesItem = () => {
        props.navigation.navigate(ScreenName.courseDetail);
    }

    const renderItem = (item) => {
        return item.type === 1 ? <ListCourses style={styles.section} data={item.data} onPressItem={onPressListCoursesItem} />
            : item.type === 2 ? <ListCourses style={styles.section} data={item.data} onPressItem={onPressListCoursesItem} />
            : item.type === 3 ? <AuthorsList style={styles.section} data={item.data} />
            : null;
    }

    return (
        <View style={CommonStyles.generalContainer}>
            <SectionList sections={data} stickySectionHeadersEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title, results } }) => (
                    <SectionHeader title={title} rightButtonTitle={results + " results >"} />
                )}
            />
        </View>
    )
}

export default SearchAllTab;

const styles = StyleSheet.create({
    section: {
        marginBottom: 20
    }
});
