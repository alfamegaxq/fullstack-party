import React, {Component} from 'react';
import Header from "../Parts/Header";

export default class Details extends Component {
    render() {

        //@TODO remove this
        // console.log(this.props);

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row mt-3 mb-3">
                        <span className="icon-back"></span> Back to Issues
                    </div>
                    <div className="row">
                        <div className="card">
                            <h1>Deprecate Symfony environemnt variables <span className="task-nr">#000001</span></h1>
                            <br/>
                            <div className="btn"><span className="icon-open d-inline-block"></span>OPEN</div>
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
