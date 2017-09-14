import React, { Component } from 'react'
import {Link} from 'react-router'

class Header extends Component{
  render(){
    return (
      <nav>
        <div className="nav-wrapper black">
          <a href="#!" class="brand-logo">TLDR</a>
          <ul className="nav-mobile offset-m6 right">
            <li></li>
            <li><Link to={'/articles'}>All Articles</Link></li>
            <li><Link to={'/show'}>One Article</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
