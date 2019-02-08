import React, { Component } from 'react';
import MemeForm from './MemeForm'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Meme Generator
          </h1>
        </header>
        <div className="main">
            <MemeForm/>
        </div>
      </div>
    );
  }
}

export default App;
