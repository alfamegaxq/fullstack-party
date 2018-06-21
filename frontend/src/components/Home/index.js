import React, {Component} from 'react';
import styles from './Home.css';
import {bindActionCreators} from "redux";
import {login} from "../../actions/RepositoryActions";
import {connect} from "react-redux";

class Home extends Component {
    componentWillMount() {
        if (this.props.location.search.startsWith("?code")) {
            this.props.login(this.props.location.search.split('=')[1]);
        }
    }

    login() {
        window.location.href= `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    }

    render() {
        if (this.props.loggedIn) {
            this.props.history.push('/issues');
        }

        return (
            <div className={styles.container}>
                <div className={styles.background}></div>
                <div className={`${styles['login-box']} center-h position-relative`}>
                    <div className="container p-0">
                        <div className="row m-0">
                            <div className="col-sm p-0">
                                <img src="/img/logo.png" className="center-h mb-4" alt="testio"/>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col-sm p-0">
                                <button onClick={this.login} className="btn full atlantis text-white rounded-5 mt-4 hover-citrus border-0">Login with GitHub</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        loggedIn: state.RepositoryReducer.loggedIn,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
