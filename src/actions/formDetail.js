import { API_URL } from '../conventions';

export function fetchForm(formId) {

  return async (dispatch, getState) => {

    dispatch({ type: 'FORM_DETAIL_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/forms/${ formId }`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ getState().session.token }` }
      }).then(response => response.json());

      let { id } = response;

      if (!id) throw response;

      dispatch({ type: 'FORM_DETAIL_SUCCESS', form: response });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FORM_DETAIL_ERROR' });

    }

  }

}