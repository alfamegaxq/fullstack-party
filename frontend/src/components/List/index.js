import React, {Component} from 'react';
import Header from "../Parts/Header";
import styles from "./List.css";

export default class List extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="row m-0">
                    <div className="col-md p-0">
                        <div className="row">
                            <div class="center-h">
                                <span class="icon-open d-inline-block mr-1"></span><span>420 Open</span>
                                <span class="icon-closed d-inline-block mr-1 ml-3"></span><span className="color-suva-grey">6.969 Closed</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['image-container']} col-md p-0`}>
                        <div className={styles.background}></div>
                        <div className={`${styles['page-title']} center-h position-relative`}>
                            <h1>Full Stack Developer Task <small className="center-h mt-3">by <img src="/img/xsmall-logo.png" alt="testio"/></small></h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
