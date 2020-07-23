import { ActionTypes } from '../globals/constants';

export const search = (dispatch) => (data) => {
    dispatch({ type: ActionTypes.search, data: data });
}

export const changeSearchText = (dispatch) => (data) => {
    dispatch({ type: ActionTypes.changeSearchText, data: data });
}

export const clearRecentSearches = (dispatch) => () => {
    dispatch({ type: ActionTypes.clearRecentSearch });
}