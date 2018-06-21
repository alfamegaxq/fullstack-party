import {combineReducers} from 'redux';
import IssuesReducer from "./IssuesReducer";
import RepositoryReducer from "./RepositoryReducer";

const Reducers = combineReducers({
    IssuesReducer,
    RepositoryReducer
});

export default Reducers
