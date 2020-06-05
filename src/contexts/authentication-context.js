import React, { useState } from 'react';

const authentications = {
    authenticated: false,
    user: null
}

const AuthenticationContext = React.createContext();

const AuthenticationProvider = (props) => {
    const [authentication, setAuthentication] = useState(authentications);

    const setAuthenticated = (authenticated) => {
        const newAuthentication = authentication;
        newAuthentication.authenticated = authenticated;
        setAuthentication(newAuthentication);
    }

    const setUser = (user) => {
        const newAuthentication = authentication;
        newAuthentication.user = user;
        setAuthentication(newAuthentication);
    }

    return <AuthenticationContext.Provider value={{authentication, setAuthenticated, setUser}}>
        {props.children}
    </AuthenticationContext.Provider>
}

export {AuthenticationProvider, AuthenticationContext}
