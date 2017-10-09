import { push } from 'react-router-redux';
import { API_URL } from '../conventions';

export function doLogin(username, password) {

  return async (dispatch, getState) => {

    dispatch({ type: 'LOGIN_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      }).then(response => response.json());

      let { token } = response;

      if (!token) throw response;

      window.localStorage.setItem('session', token);

      dispatch({ type: 'LOGIN', token });

      dispatch(push('/admin'));

    } catch (err) {
    
      console.log(err);

      dispatch({ type: 'LOGIN_ERROR' });

    }

  }

}

export function fetchSession() {

  return async (dispatch, getState) => {

    if (!getState().session.token) {

      if (!window.localStorage.getItem('session')) {

        dispatch({ type: 'SESSION_NOT_EXISTS' });

        dispatch(push('/login'));

        return;
      
      } else { 

        dispatch({ type: 'LOGIN', token: window.localStorage.getItem('session') });

      }

    }

    dispatch({ type: 'SESSION_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/session`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ getState().session.token }` }
      }).then(response => response.json())

      let { profile } = response;

      if (!profile) throw response;

      dispatch({ type: 'SESSION', profile });
    
    } catch (err) {

      console.log(err);

      dispatch({ type: 'SESSION_ERROR' });

      dispatch(doLogout());

    }

  }

}

export function doLogout() {

  return (dispatch, getState) => {

    window.localStorage.removeItem('session');

    dispatch({ type: 'SESSION_CLOSE' });

    dispatch(push('/login'));

  }

}
