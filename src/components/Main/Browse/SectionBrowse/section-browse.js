import React from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import CommonStyles from '../../../../globals/styles';
import PopularSkills from '../PopularSkills/popular-skills';
import PathsSection from '../Paths/paths-section';
import TopAuthors from '../TopAuthors/top-authors';
import SectionHeader from '../../../common/section-header';

const SectionBrowse = (props) => {
    const renderItem = (item) => {
        return item.type === 1 ? <PopularSkills data={item.data} />
            : item.type === 2 ? <PathsSection data={item.data} />
            : item.type === 3 ? <TopAuthors data={item.data} />
            : null;
    }

    const renderSectionHeader = (title) => {
        return title === "Paths" ? <SectionHeader title={title} rightButton="See all >" />
            : <SectionHeader title={title} />
    }

    return (
        <View style={styles.container}>
            <SectionList sections={props.data}
                keyExtractor={(item) => item}
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
