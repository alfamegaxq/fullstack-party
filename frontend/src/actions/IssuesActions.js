export const LOAD_ISSUES = 'LOAD_ISSUES';
export const ISSUES_LOADED = 'ISSUES_LOADED';
export const LOAD_ONE_ISSUE= 'LOAD_ONE_ISSUE';
export const ONE_ISSUE_LOADED = 'ONE_ISSUE_LOADED';
export const LOAD_COMMENTS= 'LOAD_COMMENTS';
export const COMMENTS_LOADED = 'COMMENTS_LOADED';

export const loadIssues = () => {
    return {
        type: LOAD_ISSUES
    }
};

export const issuesLoaded = (payload) => {
    return {
        type: ISSUES_LOADED,
        payload
    }
};

export const loadOneIssue = (id) => {
    return {
        type: LOAD_ONE_ISSUE,
        id
    }
};

export const oneIssueLoaded = (payload) => {
    return {
        type: ONE_ISSUE_LOADED,
        payload
    }
};

export const loadComments = (id) => {
    return {
        type: LOAD_COMMENTS,
        id
    }
};

export const commentsLoaded = (payload) => {
    return {
        type: COMMENTS_LOADED,
        payload
    }
};
