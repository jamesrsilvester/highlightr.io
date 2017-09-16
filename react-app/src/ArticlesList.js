import React, {Component} from 'react'

// TODO: handle onClick
// TODO: ADD For Each Highlight

class ArticlesList extends Component {
  render() {
    let mapArticles = this.props.articles.map(article => {
      return (
        <div className='row container'>
          <div key={article._id} className='col offset s12 white hoverable'>
            <h4>{article.title}</h4>
            <a href={article.slug}></a>
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
