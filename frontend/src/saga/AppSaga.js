import {put, takeEvery} from 'redux-saga/effects'
import axios from "axios/index";
import {
    CHANGE_PAGE,
    commentsLoaded,
    issuesLoaded,
    LOAD_COMMENTS,
    LOAD_ISSUES,
    LOAD_ONE_ISSUE,
    oneIssueLoaded
} from "../actions/IssuesActions";
import {LOAD_REPOSITORY, LOGIN, loginSuccess, repositoryLoaded} from "../actions/RepositoryActions";
import qs from "querystring";

function* loadIssues(action) {
    let page = action.page ? action.page : 1;

    const request = axios.get(
        `${process.env.REACT_APP_API_URL}/v1/issues?page=${page}`,
        {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        }
    );
    yield put.resolve(issuesLoaded(request));
}

function* loadOneIssue(action) {
    const request = axios.get(
        `${process.env.REACT_APP_API_URL}/v1/issues/${action.id}`,
        {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        }
    );
    yield put.resolve(oneIssueLoaded(request));
}

function* loadComments(action) {
    const request = axios.get(
        `${process.env.REACT_APP_API_URL}/v1/issues/${action.id}/comments`,
        {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        }
    );
    yield put.resolve(commentsLoaded(request));
}

function* loadRepository(action) {
    const request = axios.get(
        `${process.env.REACT_APP_API_URL}/v1/repository`,
        {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        }
    );
    yield put.resolve(repositoryLoaded(request));
}

function* login(action) {
    const request = axios.post(
        `${process.env.REACT_APP_API_URL}/v1/login`,
        qs.stringify({token: action.token}),
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });
    yield put.resolve(loginSuccess(request));
}

function* sagas() {
    yield takeEvery(LOAD_ISSUES, loadIssues);
    yield takeEvery(LOAD_ONE_ISSUE, loadOneIssue);
    yield takeEvery(LOAD_COMMENTS, loadComments);
    yield takeEvery(LOAD_REPOSITORY, loadRepository);
    yield takeEvery(CHANGE_PAGE, loadIssues);
    yield takeEvery(LOGIN, login);
}

export default sagas;
