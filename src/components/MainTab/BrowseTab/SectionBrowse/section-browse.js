import React from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import PopularSkills from '../PopularSkills/popular-skills';
import TopAuthors from '../TopAuthors/top-authors';
import SectionHeader from '../../../common/section-header';
import ListCoursesHorizontal from '../../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import CommonStyles from '../../../../globals/styles';
import { ScreenName } from '../../../../globals/constants';

const SectionBrowse = (props) => {
    const renderItem = (item) => {
        return item.type === 1 ? <PopularSkills data={item.data} />
            : item.type === 2 ? <ListCoursesHorizontal data={item.data} onPressItem={() => props.navigation.navigate(ScreenName.courseDetail)} />
            : item.type === 3 ? <TopAuthors data={item.data} />
            : null;
    }

    const renderSectionHeader = (title) => {
        return title === "Paths" ? <SectionHeader title={title} rightButtonTitle="See all >" rightButtonTitleStyle={CommonStyles.titleColor} />
            : <SectionHeader title={title} />
    }

    return (
        <View style={styles.container}>
            <SectionList sections={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title } }) => renderSectionHeader(title)}
            />
        </View>
    )
}

export default SectionBrowse;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
