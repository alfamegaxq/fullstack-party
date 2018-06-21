import React, {Component} from 'react';
import './App.css';
import List from "./components/List";
import {BrowserRouter, Route} from 'react-router-dom'
import Details from "./components/Details";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={List}/>
                    <Route path="/issue/:id" component={Details}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
