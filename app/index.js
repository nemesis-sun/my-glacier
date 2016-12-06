import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from 'react-router'
import appReducer from './reducers'
import App from './components/App'
import VaultPanel from './components/VaultPanel'
import VaultJobPanel from './components/VaultJobPanel'
import VaultInventoryList from './components/VaultInventoryList'


let store = createStore(appReducer, applyMiddleware(thunkMiddleware))

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='/:regionId/vaults/:vaultARN' component={VaultPanel} >
          <IndexRedirect to="inventory" />
          <Route path='inventory' component={VaultInventoryList} />
          <Route path='jobs' component={VaultJobPanel} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-root')
)