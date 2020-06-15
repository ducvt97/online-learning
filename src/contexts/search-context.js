import React, { useState } from 'react';
import { coursesData } from '../raw-data/courses';
import { authorsData } from '../raw-data/authors';

const searchTextResult = ["react", "react-native", "reactjs", "react-redux"];
const search = {
    currentSearchText: "",
    recentSearches: [],
    searchTextResult: [],
    searchResult: {
        courses: coursesData,
        paths: [],
        authors: authorsData
    }
}

const SearchContext = React.createContext();

const SearchProvider = (props) => {
    const [searches, setSearches] = useState(search);

    const onSearch = (searchText) => {
        const temp = {...searches};
        temp.currentSearchText = searchText;
        if (!searches.recentSearches.includes(searchText))
            temp.recentSearches.push(searchText);
        setSearches(temp);
    }

    const onChangeCurrentSearchText = (searchText) => {
        const temp = {...searches};
        temp.currentSearchText = searchText;
        if (searchText != "")
            temp.searchTextResult = searchTextResult;
        else {
            temp.searchTextResult = temp.recentSearches;
        }
        setSearches(temp);
    }

    const clearRecentSearches = () => {
        const temp = {...searches};
        temp.recentSearches.length = 0;
        setSearches(temp);
    }

    return <SearchContext.Provider value={{searches, onSearch, onChangeCurrentSearchText, clearRecentSearches}}>
        {props.children}
    </SearchContext.Provider>
}

export {SearchProvider, SearchContext}
