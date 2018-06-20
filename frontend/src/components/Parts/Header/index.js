import React, {Component} from 'react';
import styles from './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="white medium full position-relative">
                <img src="/img/small-logo.png" alt="testio" className="ml-3 center-abs-v"/>
                <a href="#" className={`${styles.logout} float-right d-block center-abs-v mr-3`}><span className="d-inline-block icon-logout"></span> Logout</a>
            </header>
        );
    }
}
