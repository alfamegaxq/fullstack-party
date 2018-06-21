import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REPOSIOTRY_LOADED} from "../actions/RepositoryActions";

const initialState = {
    info: [],
    loggedIn: false
};

const RepositoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case REPOSIOTRY_LOADED:
            return {...state, info: action.payload.data.data};
        case LOGIN_SUCCESS:
            return {...state, loggedIn: true};
        case LOGOUT_SUCCESS:
            return {...state, loggedIn: false};
        default:
            return state;
    }
};

export default RepositoryReducer;
