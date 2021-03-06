import React, {Component} from 'react';
import Header from "../Parts/Header";
import styles from './Details.css';
import {bindActionCreators} from "redux";
import {loadComments, loadOneIssue} from "../../actions/IssuesActions";
import {connect} from "react-redux";
import DateHelper from "../../helpers/DateHelper";

class Details extends Component {
    componentWillMount() {
        this.props.loadOneIssue(this.props.match.params.id);
        this.props.loadComments(this.props.match.params.id);
    }

    renderCommentsList() {
        if (this.props.commentsLoading) {
            return <img src="/loader.gif" alt="loading" className="mx-auto d-block" />;
        }

        let comments = [];
        this.props.comments.map((comment) => comments.push(this.renderComment(comment)));

        return comments;
    }

    renderAvatar(comment) {
        if (!comment.user) {
            return;
        }

        return (
            <img className={styles.avatar} src={comment.user['avatar_url']} alt={comment.user.login}/>
        );
    }

    renderComment(comment) {
        return (
            <div key={comment.id} className="row ml-0 mr-0">
                <div className="col-sm-3 col-md-2 col-lg-1 mt-3">
                    {this.renderAvatar(comment)}
                </div>
                <div className="col-sm-9 col-md-10 col-lg-11 pr-0">
                    <div className="card mt-3">
                        <div className="bubble-header">
                            <span className="username">{comment.user ? comment.user.login : ''}</span> commented {DateHelper.getDatesDiff(comment['created_at'])} days ago
                        </div>
                        <div className="body">{comment.body}</div>
                    </div>
                </div>
            </div>
        );
    }

    back() {
        this.props.history.push('/issues');
    }

    renderOneIssue() {
        if (this.props.issueLoading) {
            return <img src="/loader.gif" alt="loading" className="mx-auto d-block" />;
        }

        return (
            <div className="card mt-0">
                <h1 className={styles.title}>{this.props.issue.title} <span className="task-nr">#{this.props.issue.number}</span></h1>
                <br/>
                <div className={`${styles['btn-status']} btn`}>
                    <div className="btn-container">
                        <span className="btn-icon icon-open-white d-inline-block"></span>
                        <span>{this.props.issue.state}</span>
                    </div>
                </div>
                <span className="username">{this.props.issue.user ? this.props.issue.user.login : ''}</span> opened this issue {DateHelper.getDatesDiff(this.props.issue['created_at'])} days ago {this.props.issue.comments} comment
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="container">
                    <div className="row mt-3 mb-3 ml-0 mr-0">
                        <a onClick={this.back.bind(this)}><span className="icon-back d-inline-block"></span> <span className={`${styles.back} color-citrus`}>Back to Issues</span></a>
                    </div>
                    <div className="row ml-0 mr-0">
                        {this.renderOneIssue()}
                    </div>
                    {this.renderCommentsList()}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadOneIssue,
        loadComments
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        issue: state.IssuesReducer.selected,
        comments: state.IssuesReducer.comments,
        commentsLoading: state.IssuesReducer.commentsLoading,
        issueLoading: state.IssuesReducer.oneIssueLoading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
