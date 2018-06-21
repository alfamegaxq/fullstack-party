import {ISSUES_LOADED} from "../actions/IssuesActions";

const initialState = {
    issues: []
};

const IssuesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ISSUES_LOADED:
            return {...state, issues: action.payload.data.data};
        default:
            return state;
    }
};

export default IssuesReducer;
