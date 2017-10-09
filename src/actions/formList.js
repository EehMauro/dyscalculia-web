import { API_URL } from '../conventions';

export function fetchForms() {

  return async (dispatch, getState) => {

    dispatch({ type: 'FORM_LIST_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ getState().session.token }` }
      }).then(response => response.json());

      let { results } = response;

      if (!results) throw response;

      dispatch({ type: 'FORM_LIST_SUCCESS', forms: results });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FORM_LIST_ERROR' });

    }

  }

}