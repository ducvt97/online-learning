import React, { useContext } from 'react';
import { View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import ListCourses from '../../../Courses/ListCourses/list-courses';
import NotFoundView from '../NotFoundView/not-found-view';

import { CommonStyles } from '../../../../globals/styles';
import { ThemeContext } from '../../../../contexts/theme-context';
import { SearchContext } from '../../../../contexts/search-context';

const SearchPathsTab = (props) => {
    const {theme} = useContext(ThemeContext);
    const {searches} = useContext(SearchContext);

    const onPressListItem = (screenName, itemId) => {
        props.navigation.navigate(screenName, {itemId: itemId});
    }
    
    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            {props.data.length > 0 ? <SectionHeader title={props.data.length + " Results"} titleStyle={theme.titleColor} />
                : <NotFoundView theme={theme} showIcon subtitle={`We couldn't find any matches for "${searches.currentSearchText}"`} />}
            <ListCourses data={props.data} theme={theme} screenName="" onPressItem={onPressListItem} />
        </View>
    )
}

export default SearchPathsTab;
