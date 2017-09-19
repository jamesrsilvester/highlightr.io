import React, {Component} from 'react'
// TODO: ADD For Each Highlight

class ArticlesList extends Component {
  render() {
    let mapArticles = this.props.articles.map(article => {
      const highlights = article.highlights.map((highlight, i) => {
        const serverURL = "http://localhost:8080/highlights/";
        return (
          <p className="oneHighlight grey-text text-darken-3" key={i}>{highlight}</p>
        )
      })
      return (
        <div className='row container'>
          <div key={article._id} className='col s12 white hoverable'>
            <a target="_blank" href={"http://localhost:8080/highlights/" + article.slug}>
              <h5>{article.title}</h5>
              {new Date(article.date).toDateString()}
            </a>
            {highlights}
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
