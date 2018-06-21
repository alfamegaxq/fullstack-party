export const LOAD_ISSUES = 'LOAD_ISSUES';
export const ISSUES_LOADED = 'ISSUES_LOADED';

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
