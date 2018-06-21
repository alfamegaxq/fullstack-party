import React, {Component} from 'react';
import Header from "../Parts/Header";
import styles from "./List.css";
import {bindActionCreators} from "redux";
import {loadIssues} from "../../actions/IssuesActions";
import {connect} from "react-redux";

class List extends Component {
    componentWillMount() {
        this.props.loadIssues();
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="row m-0">
                    <div className="col-md p-0">
                        <div className="row">
                            <div className="center-h">
                                <span className="icon-open d-inline-block mr-1"></span><span>420 Open</span>
                                <span className="icon-closed d-inline-block mr-1 ml-3"></span><span className="color-suva-grey">6.969 Closed</span>
                            </div>
                        </div>
                        <div className={`${styles['list-container']} row`}>
                            <div className="card">
                                <div className="card-header float-left mr-3">
                                    <span className="icon-exclamation d-inline-block"></span>
                                </div>
                                <div className="card-title float-left">
                                    <div className="row m-0">
                                        <h2>[RFC] Deprecate the removal of "Bundle" suffix in twig paths</h2>
                                    </div>
                                    <div className="row m-0">
                                        <small>#20011 Opened 3 days ago by <span className="username">bozerkins</span></small>
                                    </div>
                                </div>
                                <div className="card-footer float-right ml-3">
                                    <span className="icon-chat d-inline-block"></span>7
                                </div>
                            </div>
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                        </div>
                    </div>
                    <div className={`${styles['image-container']} col-md p-0`}>
                        <div className={styles.background}></div>
                        <div className={`${styles['page-title']} center-h position-relative`}>
                            <h1>Full Stack Developer Task <small className="center-h mt-3">by <img src="/img/xsmall-logo.png" alt="testio"/></small></h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadIssues
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        issues: state.IssuesReducer.issues,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
