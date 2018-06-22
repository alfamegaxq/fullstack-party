import {
    CHANGE_PAGE,
    COMMENTS_LOADED,
    ISSUES_LOADED,
    LOAD_COMMENTS,
    LOAD_ISSUES,
    LOAD_ONE_ISSUE,
    ONE_ISSUE_LOADED
} from "../actions/IssuesActions";

const initialState = {
    issues: [],
    selected: {},
    comments: [],
    page: 1,
    issuesLoading: true,
    commentsLoading: true,
    oneIssueLoading: true,
};

const IssuesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ISSUES:
            return {...state, issuesLoading: true};
        case ISSUES_LOADED:
            return {...state, issues: action.payload.data.data, issuesLoading: false};
        case LOAD_ONE_ISSUE:
            return {...state, oneIssueLoading: true};
        case ONE_ISSUE_LOADED:
            return {...state, selected: action.payload.data.data, oneIssueLoading: false};
        case LOAD_COMMENTS:
            return {...state, commentsLoading: true};
        case COMMENTS_LOADED:
            return {...state, comments: action.payload.data.data, commentsLoading: false};
        case CHANGE_PAGE:
            return {...state, page: action.page, issuesLoading: true};
        default:
            return state;
    }
};

export default IssuesReducer;
