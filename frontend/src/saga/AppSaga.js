import {put, takeEvery} from 'redux-saga/effects'
import axios from "axios/index";
import {issuesLoaded, LOAD_ISSUES, LOAD_ONE_ISSUE, oneIssueLoaded} from "../actions/IssuesActions";

function* loadIssues(action) {
    const request = axios.get(
        `/api/v1/issues`,
        {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        }
    );
    yield put.resolve(issuesLoaded(request));
}

function* loadOneIssue(action) {
    const request = axios.get(
        `/api/v1/issues/${action.id}`,
        {
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        }
    );
    yield put.resolve(oneIssueLoaded(request));
}

function* sagas() {
    yield takeEvery(LOAD_ISSUES, loadIssues);
    yield takeEvery(LOAD_ONE_ISSUE, loadOneIssue);
}

export default sagas;
