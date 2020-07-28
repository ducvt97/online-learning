import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import SectionHeader from '../../../common/section-header';
import ListEmptyView from '../../../common/list-empty-view';

import { CommonStyles } from '../../../../globals/styles';
import { Colors, ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import CoursesServices from '../../../../core/services/courses-services';
import InstructorServices from '../../../../core/services/instructor-service';

const SearchResults = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const {theme} = useContext(ThemeContext);
    const searchContext = useContext(SearchContext);

    const searchInstructors = async (instructors, searchText) => {
        if (!searchText)
            return instructors;
        else {
            let result = [];
            searchText = searchText.toLowerCase();
            await instructors.every(async instructor => {
                await instructor.skills.every(skill => {
                    if (skill.toLowerCase().includes(searchText)) {
                        result.push(instructor);
                        return;
                    }
                });
            });
            return result;
        }
    }

    const onPressListItem = (item) => {
        setIsLoading(true);
        CoursesServices.search(item)
            .then(reponse => {
                if (reponse.status === 200)
                    InstructorServices.getAll()
                        .then(async reponse1 => {
                            if (reponse1.status === 200) {
                                const instructors = await searchInstructors(reponse1.data.payload, item);
                                await searchContext.search({
                                    searchText: item,
                                    searchResult: {
                                        courses: reponse.data.payload.rows,
                                        instructors: instructors
                                    }
                                });
                                setIsLoading(false);
                                props.navigation.navigate(ScreenName.searchResultsTabNavigation);
                            } else
                                alert(reponse.data.message);
                            setIsLoading(false);
                        })
                        .catch(error1 => {
                            setIsLoading(false);
                            alert(error1);
                            InstructorServices.handleError(error1);
                        });
                else
                    alert(reponse.data.message);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                alert(error);
                CoursesServices.handleError(error);
            });
    }

    const renderItem = ({item}) => (
        <ListItem containerStyle={styles.item} title={item}
            titleStyle={[CommonStyles.fontSizeAverage, theme.textColor]}
            onPress={() => onPressListItem(item)}
            leftIcon={{ name: "search", color: theme.inactiveTintColor }}
            bottomDivider
        />
    )

return <View style={[CommonStyles.generalContainer, theme.background]}>
    <Spinner visible={isLoading} color={theme.tintColor} />
        {searchContext.state.currentSearchText === "" ? searchContext.state.recentSearches.length > 0 ?
            <SectionHeader style={theme.background} title="Recent searches" titleStyle={theme.titleColor} rightButtonTitle="Clear"
                onPressRightButton={searchContext.clearRecentSearches} />
            : <ListEmptyView theme={theme} title="Search by title, instructor, or subject." subtitle="Over 7000 courses at your fingertips." />
        : null}
        <FlatList keyExtractor={(item, index) => index.toString()} data={searchContext.state.recentSearches} renderItem={renderItem} />
    </View>
}

export default SearchResults;

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.transparent
    }
});
