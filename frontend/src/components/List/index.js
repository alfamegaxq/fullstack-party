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
            <div key={issue.id} className="card">
                <div className="row">
                    <div className="card-header col-sm-1 mr-3">
                        <span className="icon-exclamation d-inline-block"></span>
                    </div>
                    <div className="card-title col-sm">
                        <div className="row m-0 lh-14">
                            <Link to={`/issue/${issue.number}`}><h2>{issue.title}</h2></Link>
                        </div>
                        <div className="row m-0 mt-1">
                            <small>#{issue.number} Opened {DateHelper.getDatesDiff(issue['created_at'])} days ago by <span
                                className="username">{issue.user.login}</span></small>
                        </div>
                    </div>
                    <div className="card-footer col-sm-2 ml-3 text-right">
                        <span className="icon-chat d-inline-block"></span>{` `}<span
                        className={styles['comment-count']}>{issue.comments}</span>
                    </div>
                </div>
            </div>
        );
    }

    changePage(nr) {
        this.props.changePage(nr);
    }

    renderPage(nr, active) {
        return <li key={nr} className={`page-item ${active ? 'active' : 'd-none d-sm-none d-md-block'}`}><a className="page-link" onClick={this.changePage.bind(this, nr)}>{nr}</a></li>;
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
            if (currentPage !== 1) {
                pages.push(<li key={'prev'} className="page-item"><a className="page-link-nav mr" onClick={this.changePage.bind(this, currentPage - 1)}>prev</a></li>);
            }

            //2 previous pages
            for (let i = 2; i >= 1; i--) {
                if (currentPage - i > 0) {
                    pages.push(this.renderPage(currentPage - i));
                }
            }

            //current page
            pages.push(this.renderPage(currentPage, true));

            //2 next pages
            for (let i = 1; i <= 2; i++) {
                if (currentPage + i <= totalPages) {
                    pages.push(this.renderPage(currentPage + i));
                }
            }

            if (currentPage + 2 < totalPages) {
                pages.push(<li className="page-item d-none d-sm-none d-md-block"><span className="skip" key={'null'}>...</span></li>);
            }

            //2 last pages
            for (let i = 2; i > 0; i--) {
                if (totalPages - i >= currentPage + 2) {
                    pages.push(this.renderPage(totalPages - i + 1));
                }
            }

            if (currentPage < totalPages) {
                pages.push(<li key={'next'} className="page-item"><a className="page-link-nav ml" onClick={this.changePage.bind(this, currentPage + 1)}>next</a></li>);
            }

            return (
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {pages}
                    </ul>
                </nav>
            );
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="row m-0">
                    <div className="col-md p-0">
                        <div className="row mt-4 mr-0 ml-0">
                            <div className="center-h">
                                <span
                                    className="icon-open d-inline-block mr-1"></span><span>{this.props.repository['open_issues_count']} Open</span>
                                <span className="icon-closed d-inline-block mr-1 ml-3"></span><span
                                className="color-suva-grey">@TODO Closed</span>
                            </div>
                        </div>
                        <div className={`${styles['list-container']} row`}>
                            {this.renderCardsList()}
                        </div>
                        {this.renderPagination()}
                    </div>
                    <div className={`${styles['image-container']} col-md p-0 d-none d-lg-block d-xl-block`}>
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
