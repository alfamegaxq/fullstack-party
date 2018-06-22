import {put, select, takeEvery} from 'redux-saga/effects'
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
import {
    LOAD_REPOSITORY,
    LOGIN,
    loginSuccess,
    LOGOUT,
    logoutSuccess,
    repositoryLoaded
} from "../actions/RepositoryActions";
import qs from "querystring";

function isAuthenticated(state) {
    if (state.RepositoryReducer.loggedIn === false) {
        window.location.replace('/');

        return false;
    }

    return true;
}

function* loadIssues(action) {
    const state = yield select();

    if (!isAuthenticated(state)) {
        return;
    }

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
    const state = yield select();

    if (!isAuthenticated(state)) {
        return;
    }

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
    const state = yield select();

    if (!isAuthenticated(state)) {
        return;
    }

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
    const state = yield select();

    if (!isAuthenticated(state)) {
        return;
    }

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
            withCredentials: true
        });
    yield put.resolve(loginSuccess(request));
}

function* logout(action) {
    const state = yield select();

    if (!isAuthenticated(state)) {
        return;
    }

    const request = axios.post(
        `${process.env.REACT_APP_API_URL}/v1/logout`,
        qs.stringify({}),
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        });
    yield put.resolve(logoutSuccess(request));

    action.history.push('/');
}

function* sagas() {
    yield takeEvery(LOAD_ISSUES, loadIssues);
    yield takeEvery(LOAD_ONE_ISSUE, loadOneIssue);
    yield takeEvery(LOAD_COMMENTS, loadComments);
    yield takeEvery(LOAD_REPOSITORY, loadRepository);
    yield takeEvery(CHANGE_PAGE, loadIssues);
    yield takeEvery(LOGIN, login);
    yield takeEvery(LOGOUT, logout);
}

export default sagas;
