import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import List from "./components/List";

class App extends Component {
  render() {
    return (
      <div>
        <List/>
      </div>
    );
  }
}

export default App;
