import { API_URL } from '../conventions';

export default function (pageKey) {

  return async (dispatch, getState) => {

    dispatch({ type: 'FORM_LIST_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms?limit=9${ pageKey ? `&lastKey=${ pageKey }` : '' }`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ getState().session.token }` }
      }).then(response => response.json());

      let { results: forms, lastKey } = response;

      if (!forms) throw response;

      dispatch({ type: 'FORM_LIST_SUCCESS', forms, lastKey });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FORM_LIST_ERROR' });

    }

  }

}