import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

import authenticationReducer from '../reducers/authentication-reducer';
import { login, logout, updateProfile } from '../actions/authentication-action';

const initialState = {
    authenticated: false,
    userInfo: null,
    token: null
}

const AuthenticationContext = React.createContext();

const AuthenticationProvider = (props) => {
    const [state, dispatch] = useReducer(authenticationReducer, initialState);

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    }, [state.token])

    return <AuthenticationContext.Provider value={{state, login: login(dispatch), logout: logout(dispatch),
        updateProfile: updateProfile(dispatch)}}>
        {props.children}
    </AuthenticationContext.Provider>
}

export {AuthenticationProvider, AuthenticationContext}
