import { SearchActionTypes } from '../globals/constants';
import { AsyncStorage } from 'react-native';

const makeRecentSearches = (prev, searchText, recentSearches) => {
    if (typeof recentSearches === "object")
        return recentSearches;
    else {
        try {
            prev.unshift({id: 0, content: searchText});
            AsyncStorage.setItem("recentSearches", JSON.stringify(prev));
        } catch (error) {
            console.log(error);
        }
    }
    return prev;
}

const searchReducer = (prevState, action) => {
    switch (action.type) {
        case SearchActionTypes.search:
            return {...prevState, searchResult: action.data.searchResult, currentSearchText: action.data.searchText,
                recentSearches: makeRecentSearches(prevState.recentSearches, action.data.searchText, action.data.recentSearches)};
        case SearchActionTypes.changeSearchText:
            return {...prevState, currentSearchText: action.data};
        case SearchActionTypes.clearRecentSearch:
            return {...prevState, recentSearches: []};
        case SearchActionTypes.setRecentSearch:
            return {...prevState, recentSearches: action.data};
        default:
            throw new Error(`Action ${action.type} not recognized.`);
    }
}

export default searchReducer;