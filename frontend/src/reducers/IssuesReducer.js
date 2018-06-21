import {ISSUES_LOADED, ONE_ISSUE_LOADED} from "../actions/IssuesActions";

const initialState = {
    issues: [],
    selected: {}
};

const IssuesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ISSUES_LOADED:
            return {...state, issues: action.payload.data.data};
        case ONE_ISSUE_LOADED:
            return {...state, selected: action.payload.data.data};
        default:
            return state;
    }
};

export default IssuesReducer;
