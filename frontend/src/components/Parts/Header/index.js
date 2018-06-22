import React, {Component} from 'react';
import styles from './Header.css';
import {bindActionCreators} from "redux";
import {logout} from "../../../actions/RepositoryActions";
import {connect} from "react-redux";

class Header extends Component {
    logout() {
        this.props.logout();
    }

    componentDidUpdate() {
        if (!this.props.loggedIn) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <header className="white medium full position-relative">
                <img src="/img/small-logo.png" alt="testio" className="ml-3 center-abs-v"/>
                <a onClick={this.logout.bind(this)} className={`${styles.logout} float-right d-block center-abs-v mr-3`}><span className="d-inline-block icon-logout"></span> <span>Logout</span></a>
            </header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        loggedIn: state.RepositoryReducer.loggedIn,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
