import React, { Component } from 'react';
import ArticlesContainer from './ArticlesContainer.js'
import ShowArticle from './ShowArticle.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
    <div className='home grey1'>
      <ArticlesContainer/>
      <h1 className="center-align">Single Article View</h1>
      <ShowArticle/>
    </div>
    );
  }
}

export default App;
