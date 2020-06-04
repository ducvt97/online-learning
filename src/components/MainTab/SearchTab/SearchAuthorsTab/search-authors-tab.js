import React, { useContext } from 'react';
import { View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import AuthorsList from '../AuthorsList/authors-list';

import { CommonStyles } from '../../../../globals/styles';
import SearchData from '../../../../raw-data/search';
import { ThemeContext } from '../../../../contexts/theme-context';

const SearchAuthorsTab = (props) => {
    const data = SearchData[2];
    const {theme} = useContext(ThemeContext);
    
    return (
        <View style={[CommonStyles.generalContainer, theme.background]}>
            <SectionHeader title={data.results + " Results"} titleStyle={theme.titleColor} />
            <AuthorsList data={data.data[0].data} />
        </View>
    )
}

export default SearchAuthorsTab;
