import { API_URL } from '../conventions';

export default function (data) {

  return async (dispatch, getState) => {

    dispatch({ type: 'UPDATE_FORM_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ getState().dataEntry.token }`
        },
        body: JSON.stringify(data)
      }).then(response => response.json());

      let { success } = response;

      if (!success) throw response;

      dispatch({ type: 'UPDATE_FORM_SUCCESS' });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'UPDATE_FORM_ERROR' });

    }

  }

}