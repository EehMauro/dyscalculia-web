import { API_URL } from '../conventions';

export default function (data) {

  return async (dispatch, getState) => {

    dispatch({ type: 'CREATE_FORM_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(response => response.json());

      let { token } = response;

      if (!token) throw response;

      dispatch({ type: 'CREATE_FORM_SUCCESS', token });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'CREATE_FORM_ERROR' });

    }

  }

}