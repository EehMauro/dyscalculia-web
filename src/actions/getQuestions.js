import { API_URL } from '../conventions';

export function getQuestions() {

  return async (dispatch, getState) => {

    dispatch({ type: 'GET_QUESTIONS_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/questions`).then(response => response.json());

      let { results } = response;

      if (!results) throw response;

      dispatch({ type: 'GET_QUESTIONS_SUCCESS', questions: results });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'GET_QUESTIONS_ERROR' });

    }

  }

}