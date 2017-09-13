import React from 'react'
import {Route} from 'react-router'
import App from '../App.js'
import ShowArticle from '../ShowArticle.js'

export default (
  <Route path='/' component={App}>
    <Router path='/show' component={ShowArticle} />
  </Route>
)

ReactDOM.render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('root')
);
