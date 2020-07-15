import { ActionTypes } from '../globals/constants';

const authenticationReducer = (prevState, action) => {
    switch (action.type) {
        case ActionTypes.login:
            return {...prevState, authenticated: true, userInfo: action.data.userInfo, token: action.data.token};
        case ActionTypes.logout:
            return {...prevState, authenticated: false, userInfo: null, token: null};
        case ActionTypes.updateProfile:
            return {...prevState, userInfo: action.data};
        default:
            throw new Error(`Action ${action.type} not recognized.`);
    }
}

export default authenticationReducer;