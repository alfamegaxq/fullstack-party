import {REPOSIOTRY_LOADED} from "../actions/RepositoryActions";

const initialState = {
    info: [],
};

const RepositoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case REPOSIOTRY_LOADED:
            return {...state, info: action.payload.data.data};
        default:
            return state;
    }
};

export default RepositoryReducer;
