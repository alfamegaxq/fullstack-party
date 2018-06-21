import React, {Component} from 'react';
import Header from "../Parts/Header";
import {bindActionCreators} from "redux";
import {loadOneIssue} from "../../actions/IssuesActions";
import {connect} from "react-redux";
import DateHelper from "../../helpers/DateHelper";

class Details extends Component {
    componentWillMount() {
        this.props.loadOneIssue(this.props.match.params.id);
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
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm">
                            <div className="card"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadOneIssue
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        issue: state.IssuesReducer.selected,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
