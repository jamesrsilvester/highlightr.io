import React, { Component } from 'react';
import ArticlesContainer from './ArticlesContainer.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
    <div className='home'>
      <ArticlesContainer/>
    </div>
    );
  }
}

export default App;
