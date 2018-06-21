import React, {Component} from 'react';
import Header from "../Parts/Header";
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
        let comments = [];
        this.props.comments.map((comment) => {
            comments.push(this.renderComment(comment));
        });

        return comments;
    }

    renderAvatar(comment) {
        if (!comment.user) {
            return;
        }

        return (
            <img src={comment.user['avatar_url']} alt={comment.user.login}/>
        );
    }

    renderComment(comment) {
        return (
            <div className="row">
                <div className="col-sm-1">
                    {this.renderAvatar(comment)}
                </div>
                <div className="col-sm">
                    <div className="card">
                        <div className="bubble-header">
                            {comment.user ? comment.user.login : ''} commented {DateHelper.getDatesDiff(comment['created_at'])} days ago
                        </div>
                        <div className="body">{comment.body}</div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row mt-3 mb-3">
                        <span className="icon-back"></span> Back to Issues
                    </div>
                    <div className="row">
                        <div className="card">
                            <h1>{this.props.issue.title} <span className="task-nr">#{this.props.issue.number}</span></h1>
                            <br/>
                            <div className="btn"><span className="icon-open d-inline-block"></span>{this.props.issue.state}</div>
                            {this.props.issue.user ? this.props.issue.user.login : ''} opened this issue {DateHelper.getDatesDiff(this.props.issue['created_at'])} days ago {this.props.issue.comments} comment
                        </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
