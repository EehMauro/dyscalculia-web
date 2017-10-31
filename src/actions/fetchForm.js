import { API_URL } from '../conventions';

export default function (formId) {

  return async (dispatch, getState) => {

    dispatch({ type: 'FORM_DETAIL_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms/${ formId }`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ getState().session.token }` }
      }).then(response => response.json());

      let { email } = response;

      if (!email) throw response;

      dispatch({ type: 'FORM_DETAIL_SUCCESS', form: response });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FORM_DETAIL_ERROR' });

    }

  }

}