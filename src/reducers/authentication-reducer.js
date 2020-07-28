import { AuthenticationActionTypes } from '../globals/constants';

const authenticationReducer = (prevState, action) => {
    switch (action.type) {
        case AuthenticationActionTypes.login:
            return {...prevState, authenticated: true, userInfo: action.data.userInfo, token: action.data.token};
        case AuthenticationActionTypes.logout:
            return {...prevState, authenticated: false, userInfo: null, token: null};
        case AuthenticationActionTypes.updateProfile:
            return {...prevState, userInfo: action.data};
        default:
            throw new Error(`Action ${action.type} not recognized.`);
    }
}

export default authenticationReducer;