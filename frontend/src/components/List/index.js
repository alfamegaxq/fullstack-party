import React, {Component} from 'react';
import Header from "../Parts/Header";
import styles from "./List.css";
import {bindActionCreators} from "redux";
import {changePage, loadIssues} from "../../actions/IssuesActions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import DateHelper from "../../helpers/DateHelper";
import {loadRepository} from "../../actions/RepositoryActions";

class List extends Component {
    componentWillMount() {
        this.props.loadIssues();
        this.props.loadRepository();
    }

    renderCardsList() {
        let issues = [];

        this.props.issues.map((issue) => issues.push(this.renderCard(issue)));

        return issues;
    }

    renderCard(issue) {
        return (
            <div className="card">
                <div key={issue.id} className="card-header float-left mr-3">
                    <span className="icon-exclamation d-inline-block"></span>
                </div>
                <div className="card-title float-left">
                    <div className="row m-0">
                        <Link to={`/issue/${issue.number}`}><h2>{issue.title}</h2></Link>
                    </div>
                    <div className="row m-0">
                        <small>#{issue.number} Opened {DateHelper.getDatesDiff(issue['created_at'])} days ago by <span
                            className="username">{issue.user.login}</span></small>
                    </div>
                </div>
                <div className="card-footer float-right ml-3">
                    <span className="icon-chat d-inline-block"></span>{` `}{issue.comments}
                </div>
            </div>
        );
    }

    changePage(nr) {
        this.props.changePage(nr);
    }

    renderPage(nr) {
        return <a href="javascript:void(0)" onClick={this.changePage.bind(this, nr)}>{nr}</a>;
    }

    renderPagination() {
        const total = this.props.repository['open_issues_count'];

        if (total <= 4) {
            return;
        }

        const totalPages = Math.ceil(total / 4);

        if (totalPages <= 5) {
            let pages = [];

            for (let i = 0; i < totalPages; i++) {
                pages.push(this.renderPage(i + 1));
            }
            return pages;
        } else {
            let pages = [];
            const currentPage = this.props.page;
            if (currentPage != 1) {
                pages.push(<a href="javascript:void(0)" onClick={this.changePage.bind(this, currentPage - 1)}>prev</a>);
            }

            for (let i = 1; i <= 2; i++) {
                if (currentPage - i > 0) {
                    pages.push(this.renderPage(currentPage - i));
                }
            }

            pages.push(this.renderPage(currentPage));

            for (let i = 1; i <= 2; i++) {
                if (currentPage + i <= totalPages) {
                    pages.push(this.renderPage(currentPage + i));
                }
            }

            if (currentPage + 2 < totalPages) {
                pages.push(<span>...</span>);
            }

            for (let i = 2; i > 0; i--) {
                if (totalPages - i > currentPage + 2) {
                    pages.push(this.renderPage(totalPages - i));
                }
            }

            if (currentPage < totalPages) {
                pages.push(<a href="javascript:void(0)" onClick={this.changePage.bind(this, currentPage + 1)}>next</a>);
            }

            return pages;
        }

    }

    render() {
        return (
            <div>
                <Header/>
                <div className="row m-0">
                    <div className="col-md p-0">
                        <div className="row">
                            <div className="center-h">
                                <span className="icon-open d-inline-block mr-1"></span><span>{this.props.repository['open_issues_count']} Open</span>
                                <span className="icon-closed d-inline-block mr-1 ml-3"></span><span
                                className="color-suva-grey">@TODO Closed</span>
                            </div>
                        </div>
                        <div className={`${styles['list-container']} row`}>
                            {this.renderCardsList()}
                        </div>
                        <div className="pagination">
                            {this.renderPagination()}
                        </div>
                    </div>
                    <div className={`${styles['image-container']} col-md p-0`}>
                        <div className={styles.background}></div>
                        <div className={`${styles['page-title']} center-h position-relative`}>
                            <h1>Full Stack Developer Task <small className="center-h mt-3">by <img src={`${process.env.REACT_APP_CDN_URL}/img/xsmall-logo.png`} alt="testio"/></small></h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadIssues,
        loadRepository,
        changePage
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        issues: state.IssuesReducer.issues,
        page: state.IssuesReducer.page,
        repository: state.RepositoryReducer.info,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
