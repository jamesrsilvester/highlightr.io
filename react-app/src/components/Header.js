import React, { Component } from 'react'
import {Link} from 'react-router'

class Header extends Component{
  render(){
    return (
      <nav>
        <div className="nav-wrapper grey2">
          <img href="#!" className="brand-logo" alt="" src="https://i.imgur.com/a2sk6oF.png?1"></img>
          <ul className="nav-mobile right">
            <li><Link to={'/articles'}>All Articles</Link></li>
            <li><Link to={'/show'}>One Article</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
