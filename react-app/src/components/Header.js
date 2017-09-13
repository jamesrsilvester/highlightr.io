import React, { Component } from 'react'
import {Link} from 'react-router'

class Header extends Component{
  render(){
    return (
      <header>
        <div className="grey center-align"><Link to={'/articles'}>All Articles</Link></div>
      </header>
    )
  }
}

export default Header
