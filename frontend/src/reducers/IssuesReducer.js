import {CHANGE_PAGE, COMMENTS_LOADED, ISSUES_LOADED, ONE_ISSUE_LOADED} from "../actions/IssuesActions";

const initialState = {
    issues: [],
    selected: {},
    comments: [],
    page: 1
};

const IssuesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ISSUES_LOADED:
            return {...state, issues: action.payload.data.data};
        case ONE_ISSUE_LOADED:
            return {...state, selected: action.payload.data.data};
        case COMMENTS_LOADED:
            return {...state, comments: action.payload.data.data};
        case CHANGE_PAGE:
            return {...state, page: action.page};
        default:
            return state;
    }
};

export default IssuesReducer;
