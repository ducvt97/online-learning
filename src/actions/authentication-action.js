import { ActionTypes } from '../globals/constants';

export const login = (dispatch) => (data) => {
    dispatch({ type: ActionTypes.login, data: data });
}

export const logout = (dispatch) => () => {
    dispatch({ type: ActionTypes.logout });
}

export const updateProfile = (dispatch) => (data) => {
    dispatch({ type: ActionTypes.updateProfile, data: data });
}