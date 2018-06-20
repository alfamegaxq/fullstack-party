import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import List from "./components/List";
import Details from "./components/Details";

class App extends Component {
  render() {
    return (
      <div>
        <Details/>
      </div>
    );
  }
}

export default App;
