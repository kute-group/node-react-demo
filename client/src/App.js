import React, { Component } from 'react';
import './assets/styles/app.css';
import { MainFooter, MainHeader } from './components';
class App extends Component {

  render() {
    return (
      <div className="app">
        <MainHeader />
        <div className="main">
          <div className="wrap">{this.props.children}</div>
        </div>
        <MainFooter />
      </div>
    );
  }
}

export default App;
