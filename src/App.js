import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main className="App-main">
          <Sidebar types={this.props.types}></Sidebar>
        </main>
      </div>
    );
  }
}

export default App;
