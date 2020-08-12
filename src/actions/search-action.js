import { SearchActionTypes } from '../globals/constants';

export const search = (dispatch) => (data) => {
    dispatch({ type: SearchActionTypes.search, data: data });
}

export const changeSearchText = (dispatch) => (data) => {
    dispatch({ type: SearchActionTypes.changeSearchText, data: data });
}

export const clearRecentSearches = (dispatch) => () => {
    dispatch({ type: SearchActionTypes.clearRecentSearch });
}

export const setRecentSearches = (dispatch, data) => {
    dispatch({ type: SearchActionTypes.setRecentSearch, data: data });
}

export const setRecentSearches2 = (dispatch) => (data) => {
    dispatch({ type: SearchActionTypes.setRecentSearch, data: data });
}