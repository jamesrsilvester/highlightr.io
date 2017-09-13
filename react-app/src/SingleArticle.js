import React, { Component } from 'react'

class SingleArticle extends Component {
  render (){
    return (
      <div className='row container'>
        <div className='col offset s12 white hoverable'>
        <h3>This is an Article</h3>
        <a href="https://jobs.lever.co/joinhonor.com/a4bda721-e1db-4f4a-81cf-c791a3ad59ad">joinhonor.com/jobs/growth-engineer</a>
        <p>This is a Highlighted note</p>
        </div>
      </div>
    )
  }
}

export default SingleArticle
