import React, {Component} from 'react'
import SingleArticle from './SingleArticle.js'

class ArticlesContainer extends Component {
  render() {
    return (
      <div className='row grey1'>
        <div className='row'>
          <div className='col offset-m2 m7'>
            <h1>James Silvester</h1>
            <h4>King of the GIFS</h4>
          </div>
        </div>
        <div className='row'>
          <SingleArticle/>
        </div>
      </div>
    )
  }
}

export default ArticlesContainer
