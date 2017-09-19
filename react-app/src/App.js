import React, { Component } from 'react';
import Header from './components/Header.js'
import './App.css';

class App extends Component {
  render() {
    return (
    <div className='home grey1'>
      <Header />
      {this.props.children}
    </div>
    );
  }
}

export default App;
