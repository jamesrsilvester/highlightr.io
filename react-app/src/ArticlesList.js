import React, {Component} from 'react'
// TODO: ADD For Each Highlight

class ArticlesList extends Component {
  render() {
    let mapArticles = this.props.articles.map(article => {
      return (
        <div className='row container'>
          <div key={article._id} className='col s12 white hoverable'>
            <a href={article.slug}>
              <h5>{article.title}</h5>
            </a>
            <p>{article.highlights}</p>
          </div>
        </div>
      )
    })

    return (
      <div className='row container'>
        {mapArticles}
      </div>

    )
  }
}
export default ArticlesList
