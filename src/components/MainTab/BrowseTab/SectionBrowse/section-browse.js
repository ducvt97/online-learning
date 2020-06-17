import React, { useContext } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';

import PopularSkills from '../PopularSkills/popular-skills';
import TopAuthors from '../TopAuthors/top-authors';
import SectionHeader from '../../../common/section-header';
import ListCoursesHorizontal from '../../../Courses/ListCoursesHorizontal/list-courses-horizontal';

import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { AuthorsContext } from '../../../../contexts/authors-context';
import { PathsContext } from '../../../../contexts/paths-context';

const SectionBrowse = (props) => {
    const {theme} = useContext(ThemeContext);
    const {authors} = useContext(AuthorsContext);
    const {paths} = useContext(PathsContext);

    const section = [
        {
            title: "Popular Skills",
            data: [{ type: 1, data: {
                skills: ["Angular", "JavaScript", "C#", "Java", "VueJS"],
                topics: ["Conferences", "<Software>", "Bussiness", "Creative", "IT", "Design",
                    "Security", "Architecture", "Data", "Certification"]
            }}]
        },
        {
            title: "Paths",
            data: [{ type: 2, data: paths }]
        },
        {
            title: "Top Authors",
            data: [{ type: 3, data: authors }]
        }
    ]

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }

    const renderItem = (item) => {
        return item.type === 1 ? <PopularSkills data={item.data} />
            : item.type === 2 ? <ListCoursesHorizontal data={item.data} screenName={ScreenName.pathDetail} onPressItem={onPressListItem} />
            : item.type === 3 ? <TopAuthors data={item.data} screenName={ScreenName.authorDetail} onPressItem={onPressListItem} />
            : null;
    }

    const renderSectionHeader = (title, data) => {
        return data[0].data.length > 0 ? 
            <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor}
                rightButtonTitle="See all >" rightButtonTitleStyle={theme.titleColor} />
            : <SectionHeader style={theme.background} title={title} titleStyle={theme.titleColor} />
    }

    return (
        <View style={styles.container}>
            <SectionList sections={section}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { title, data } }) => renderSectionHeader(title, data)}
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
