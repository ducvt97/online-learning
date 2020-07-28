import { AuthenticationActionTypes } from '../globals/constants';

export const login = (dispatch) => (data) => {
    dispatch({ type: AuthenticationActionTypes.login, data: data });
}

export const logout = (dispatch) => () => {
    dispatch({ type: AuthenticationActionTypes.logout });
}

export const updateProfile = (dispatch) => (data) => {
    dispatch({ type: AuthenticationActionTypes.updateProfile, data: data });
}