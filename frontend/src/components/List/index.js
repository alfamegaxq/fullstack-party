import React, {Component} from 'react';
import Header from "../Parts/Header";
import styles from "./List.css";
import {bindActionCreators} from "redux";
import {loadIssues} from "../../actions/IssuesActions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

class List extends Component {
    componentWillMount() {
        this.props.loadIssues();
    }

    getDatesDiff(date) {
        const now = new Date();
        const created = new Date(date);
        const timeDiff = Math.abs(created.getTime() - now.getTime());

        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    renderCardsList() {
        let issues = [];

        this.props.issues.map((issue) => {
            issues.push(this.renderCard(issue));
        });

        return issues;
    }

    renderCard(issue) {
        return (
            <div className="card">
                <div className="card-header float-left mr-3">
                    <span className="icon-exclamation d-inline-block"></span>
                </div>
                <div className="card-title float-left">
                    <div className="row m-0">
                        <Link key={issue.id} to={`/issue/${issue.id}`}><h2>{issue.title}</h2></Link>
                    </div>
                    <div className="row m-0">
                        <small>#{issue.number} Opened {this.getDatesDiff(issue['created_at'])} days ago by <span
                            className="username">{issue.user.login}</span></small>
                    </div>
                </div>
                <div className="card-footer float-right ml-3">
                    <span className="icon-chat d-inline-block"></span>{` `}{issue.comments}
                </div>
            </div>
        );
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
                                <span className="icon-closed d-inline-block mr-1 ml-3"></span><span
                                className="color-suva-grey">6.969 Closed</span>
                            </div>
                        </div>
                        <div className={`${styles['list-container']} row`}>
                            {this.renderCardsList()}
                        </div>
                    </div>
                    <div className={`${styles['image-container']} col-md p-0`}>
                        <div className={styles.background}></div>
                        <div className={`${styles['page-title']} center-h position-relative`}>
                            <h1>Full Stack Developer Task <small className="center-h mt-3">by <img
                                src="/img/xsmall-logo.png" alt="testio"/></small></h1>
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
