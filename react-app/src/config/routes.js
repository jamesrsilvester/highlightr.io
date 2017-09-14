import React from 'react'
import {Route} from 'react-router'
import App from '../App.js'
import ArticlesContainer from '../ArticlesContainer.js'
import ShowArticle from '../ShowArticle.js'

export default (
  <Route path='/' component={App}>
    <Route path='/articles' component={ArticlesContainer} />
    <Route path='/show' component={ShowArticle} />
  </Route>
)
