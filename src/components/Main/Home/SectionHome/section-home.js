import React from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import ListCoursesHorizontal from '../../../Courses/ListCoursesHorizontal/list-courses-horizontal';
import SectionHeader from '../../../common/section-header';
import CommonStyles from '../../../../globals/styles';

const SectionHome = (props) => {
    const renderItem = (item) => {
        return item.type === 1 ? <ListCoursesHorizontal data={item.data} />
            : item.type === 2 ? <ListCoursesHorizontal data={item.data} />
            : item.type === 3 ? <ListCoursesHorizontal data={item.data} />
            : item.type === 4 ? <ListCoursesHorizontal data={item.data} />
            : null;
    }

    const renderSectionHeader = (title, data) => {
        console.log(data[0].data.length);
        return data[0].data.length > 0 ? 
            <SectionHeader title={title} rightButtonTitle="See all >" rightButtonTitleStyle={CommonStyles.titleColor} />
            : <SectionHeader title={title} />
    }

    return (
        <View style={styles.container}>
            <SectionList sections={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title, data } }) => renderSectionHeader(title, data)}
            />
        </View>
    )
}

export default SectionHome;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
