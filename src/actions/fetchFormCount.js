import { API_URL } from '../conventions';

export default function () {

  return async (dispatch, getState) => {

    dispatch({ type: 'FORM_COUNT_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms/count`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ getState().session.token }` }
      }).then(response => response.json());

      let { count } = response;

      if (!count) throw response;

      dispatch({ type: 'FORM_COUNT_SUCCESS', count });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FORM_COUNT_ERROR' });

    }

  }

}