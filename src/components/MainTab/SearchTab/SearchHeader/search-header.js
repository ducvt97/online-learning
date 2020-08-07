import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { ScreenName } from '../../../../globals/constants';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';
import CoursesServices from '../../../../core/services/courses-services';
import InstructorServices from '../../../../core/services/instructor-service';
import { LanguageContext } from '../../../../contexts/language-context';

const SearchHeader = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const searchContext = useContext(SearchContext);
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);

    const onChangeText = (text) => {
        searchContext.changeSearchText(text);
        if (props.route.name === ScreenName.searchResultsTabNavigation)
            props.navigation.navigate(ScreenName.searchResults);
    }

    const onClear = () => {
        searchContext.changeSearchText("");
        if (props.route.name === ScreenName.searchResultsTabNavigation)
            props.navigation.navigate(ScreenName.searchResults);
    }

    const searchInstructors = async (instructors, searchText) => {
        if (!searchText) return instructors;
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

    const onSubmitEditing = (text) => {
        setIsLoading(true);
        CoursesServices.search(text)
            .then(reponse => {
                if (reponse.status === 200)
                    InstructorServices.getAll()
                        .then(async reponse1 => {
                            if (reponse1.status === 200) {
                                const instructors = await searchInstructors(reponse1.data.payload, text);
                                await searchContext.search({
                                    searchText: text,
                                    searchResult: {
                                        courses: reponse.data.payload.rows,
                                        instructors: instructors
                                    }
                                });
                                setIsLoading(false);
                                props.navigation.navigate(ScreenName.searchResultsTabNavigation);
                            } else {
                                alert(reponse.data.message);
                                setIsLoading(false);
                            }
                        }).catch(error1 => {
                            setIsLoading(false);
                            alert(error1);
                            InstructorServices.handleError(error1);
                        });
                else {
                    alert(reponse.data.message);
                    setIsLoading(false);
                }
            }).catch(error => {
                setIsLoading(false);
                alert(error);
                CoursesServices.handleError(error);
            });
    }

    return <View>
        <Spinner visible={isLoading} color={theme.tintColor} />
        <SearchBar containerStyle={[styles.searchContainer, theme.navigationHeader]} 
            cancelButtonProps={{buttonStyle: styles.buttonCancel, buttonTextStyle: theme.textColor}}
            cancelButtonTitle={langContext.state.translation["cancel"]}
            platform="ios" placeholder="Search" showCancel={true}
            onChangeText={(text) => onChangeText(text)} onCancel={onClear} onClear={onClear}
            onSubmitEditing={() => onSubmitEditing(searchContext.state.currentSearchText)}
            value={searchContext.state.currentSearchText} />
    </View>
}

export default SearchHeader;

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 10,
        paddingTop: 30,
    },
    buttonCancel: {
        marginTop: 10,
        marginRight: 5
    }
});
