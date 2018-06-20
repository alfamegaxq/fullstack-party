import React, {Component} from 'react';
import styles from './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.background}></div>
                <div className={`${styles['login-box']} center-h position-relative`}>
                    <div className="container p-0">
                        <div className="row m-0">
                            <div className="col-sm p-0">
                                <img src="/img/logo.png" className="center-h mb-4"/>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col-sm p-0">
                                <button className="btn full atlantis text-white rounded-5 mt-4 hover-citrus border-0">Login with GitHub</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
