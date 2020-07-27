import React, { useReducer } from 'react';
import searchReducer from '../reducers/search-reducer';
import { search, changeSearchText, clearRecentSearches } from '../actions/search-action';

const initialState = {
    currentSearchText: "",
    recentSearches: [],
    searchResult: {}
}

const SearchContext = React.createContext();

const SearchProvider = (props) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    return <SearchContext.Provider value={{state, search: search(dispatch), changeSearchText: changeSearchText(dispatch),
        clearRecentSearches: clearRecentSearches(dispatch)}}>
        {props.children}
    </SearchContext.Provider>
}

export {SearchProvider, SearchContext}
