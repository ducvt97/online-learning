import { SearchActionTypes } from '../globals/constants';

const addToRecentSearches = (recentSearches, searchText) => {
    if (!recentSearches.includes(searchText))
        recentSearches.unshift(searchText);
    return recentSearches;
}

const searchReducer = (prevState, action) => {
    switch (action.type) {
        case SearchActionTypes.search:
            return {...prevState, recentSearches: addToRecentSearches(prevState.recentSearches, action.data.searchText),
                searchResult: action.data.searchResult, currentSearchText: action.data.searchText};
        case SearchActionTypes.changeSearchText:
            return {...prevState, currentSearchText: action.data};
        case SearchActionTypes.clearRecentSearch:
            return {...prevState, recentSearches: []};
        default:
            throw new Error(`Action ${action.type} not recognized.`);
    }
}

export default searchReducer;