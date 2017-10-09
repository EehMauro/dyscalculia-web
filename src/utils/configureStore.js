import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger({ level: 'info', collapsed: true });

export default function (history) {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(browserHistory)
    )
  );
}
