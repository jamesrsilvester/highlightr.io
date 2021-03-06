import React, {Component} from 'react'
import ArticlesList from './ArticlesList.js'
import $ from 'jquery-ajax'

class ArticlesContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      articles: []
    }
  }

  loadArticlesFromServer = () => {
    $.ajax({
      method: 'GET',
      url: 'http://my.highlightr.io/api/articles'
    })
    .then((res) => {
      this.setState(
        {articles: res}
      )
      console.log(res);
    })
  }

  componentDidMount = () => {
    this.loadArticlesFromServer()
  };

  render() {
    return (
      <div className='row grey2'>
        <div className='row'>
          <div className='col offset-m4 m6'>
          </div>
        </div>
        <div className='row'>
          <h2 className="center-align">My Highlighted Articles</h2>
          <ArticlesList articles={this.state.articles}/>
        </div>
      </div>
    )
  }
}

export default ArticlesContainer
