import React, { useReducer, useEffect, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import searchReducer from '../reducers/search-reducer';
import { search, changeSearchText, clearRecentSearches, setRecentSearches } from '../actions/search-action';
import { AuthenticationContext } from './authentication-context';
import CoursesServices from '../core/services/courses-services';

const initialState = {
    currentSearchText: "",
    recentSearches: [],
    searchResult: {}
}

const SearchContext = React.createContext();

const SearchProvider = (props) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);
    const authContext = useContext(AuthenticationContext);

    useEffect(() => {
        const checkAndSetRecentSearches = async () => {
            if (authContext.state.token) {
                CoursesServices.getSearchHistoryWithToken(authContext.state.token)
                    .then(response => {
                        if (response.status === 200) {
                            setRecentSearches(dispatch, response.data.payload.data);
                        } else
                            console.log(response.data.message);
                    }).catch(error => CoursesServices.handleError(error));
            } else {
                try {
                    const value = await AsyncStorage.getItem("recentSearches");
                    if (value !== null) {
                        const recentSearches = JSON.parse(value);
                        setRecentSearches(dispatch, await recentSearches);
                    }
                } catch (error) { console.log(error); }
            }
        }
        checkAndSetRecentSearches();
    }, [authContext.state.token])
    return <SearchContext.Provider value={{state, search: search(dispatch), changeSearchText: changeSearchText(dispatch),
        clearRecentSearches: clearRecentSearches(dispatch)}}>
        {props.children}
    </SearchContext.Provider>
}

export {SearchProvider, SearchContext}
