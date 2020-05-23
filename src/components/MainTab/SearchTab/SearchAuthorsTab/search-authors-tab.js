import React from 'react';
import { View } from 'react-native';

import SectionHeader from '../../../common/section-header';
import AuthorsList from '../AuthorsList/authors-list';

import CommonStyles from '../../../../globals/styles';
import SearchData from '../../../../raw-data/search';

const SearchAuthorsTab = (props) => {
    const data = SearchData[2];
    
    return (
        <View style={CommonStyles.generalContainer}>
            <SectionHeader title={data.results + " Results"} />
            <AuthorsList data={data.data[0].data} />
        </View>
    )
}

export default SearchAuthorsTab;
