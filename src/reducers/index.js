import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import session from './session';
import navigation from './navigation';
import questions from './questions';
import formList from './formList';
import formDetail from './formDetail';

export default combineReducers({
  session,
  navigation,
  questions,
  formList,
  formDetail,
  routing: routerReducer
});
