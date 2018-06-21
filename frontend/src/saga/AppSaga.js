import {put, takeEvery} from 'redux-saga/effects'
import axios from "axios/index";
import {issuesLoaded, LOAD_ISSUES} from "../actions/IssuesActions";

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

function* sagas() {
    yield takeEvery(LOAD_ISSUES, loadIssues);
}

export default sagas;
