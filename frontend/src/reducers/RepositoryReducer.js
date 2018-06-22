import {LOAD_REPOSITORY, LOGIN_SUCCESS, LOGOUT_SUCCESS, REPOSIOTRY_LOADED} from "../actions/RepositoryActions";

const initialState = {
    info: [],
    loggedIn: false,
    repositoryLoading: true
};

const RepositoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REPOSITORY:
            return {...state, repositoryLoading: true};
        case REPOSIOTRY_LOADED:
            return {...state, info: action.payload.data.data, repositoryLoading: false};
        case LOGIN_SUCCESS:
            return {...state, loggedIn: action.payload.data.data};
        case LOGOUT_SUCCESS:
            return {...state, loggedIn: action.payload.data.data};
        default:
            return state;
    }
};

export default RepositoryReducer;
