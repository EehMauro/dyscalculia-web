import { API_URL } from '../conventions';

export function postForm(data) {

  return async (dispatch, getState) => {

    dispatch({ type: 'POST_FORM_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(response => response.json());

      let { success } = response;

      if (!success) throw response;

      dispatch({ type: 'POST_FORM_SUCCESS' });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'POST_FORM_ERROR' });

    }

  }

}