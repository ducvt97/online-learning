import { AuthenticationActionTypes } from '../globals/constants';

export const login = (dispatch) => (data) => {
    dispatch({ type: AuthenticationActionTypes.login, data: data });
}

export const logout = (dispatch) => () => {
    dispatch({ type: AuthenticationActionTypes.logout });
}

// Action when user update profile: name, phone, avatar
export const updateProfile = (dispatch) => (data) => {
    dispatch({ type: AuthenticationActionTypes.updateProfile, data: data });
}