import React, {Component} from 'react'
// TODO: ADD For Each Highlight

class ArticlesList extends Component {
  render() {
    let mapArticles = this.props.articles.map(article => {
      const highlights = article.highlights.map((highlight, i) => {
        // const serverURL = "http://my.highlightr.io/highlights/";
        return (
          <p className="oneHighlight" key={i}>{highlight}</p>
        )
      })
      return (
        <div className='row'>
          <div key={article._id} className='col s12 grey1 lighten-4 hoverable z-depth-1'>
            <div className='col s10'>
              <a className="black-text" target="_blank" href={"http://my.highlightr.io/highlights/" + article.slug}>
              <h5>{article.title}</h5></a>
            </div>
            <div className='col s2 right-align'>
              <a className="black-text" target="_blank" href={"http://my.highlightr.io/highlights/" + article.slug}>
              <img src="https://i.imgur.com/l2NAYOR.png" alt="share"></img></a>
            </div>
            <div className="col s12">
              {highlights}
            </div>
            <div className='col s12 grey-text text-darken-2 center-align'>
              Highlighted on {new Date(article.date).toDateString()} -
              <a className='grey-text text-darken-2' href={article.url}> View Original Article</a>
            </div>
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
