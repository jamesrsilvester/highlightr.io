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
      <div className='row grey1'>
        <div className='row'>
          <div className='col offset-m2 m7'>
            <h1>James Silvester</h1>
            <h4>King of the GIFS</h4>
          </div>
        </div>
        <div className='row'>
          <ArticlesList articles={this.state.articles}/>
        </div>
      </div>
    )
  }
}

export default ArticlesContainer
