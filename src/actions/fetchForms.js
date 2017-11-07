import { API_URL } from '../conventions';

export default function () {

  return async (dispatch, getState) => {

    dispatch({ type: 'FORM_LIST_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms?limit=10`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ getState().session.token }` }
      }).then(response => response.json());

      let { results: forms } = response;

      if (!forms) throw response;

      dispatch({ type: 'FORM_LIST_SUCCESS', forms });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FORM_LIST_ERROR' });

    }

  }

}