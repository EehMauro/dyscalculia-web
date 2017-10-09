import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from '../utils';

import {
  Wrapper,
  AdminPanelWrapper
} from '../bootstrap';

import {
  Login,
  Dashboard,
  DataEntry,
  FormList,
  FormDetail
} from '../pages';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ Wrapper }>
        <IndexRoute component={ DataEntry } />
        <Route path="/login" component={ Login } />
        <Route path="/admin" component={ AdminPanelWrapper }>
          <IndexRoute component={ Dashboard } />
          <Route path="/admin/forms" component={ FormList } />
          <Route path="/admin/forms/:id" component={ FormDetail } />
        </Route>
      </Route>
    </Router>
  </Provider>
)
