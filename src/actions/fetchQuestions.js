import { API_URL } from '../conventions';

export default function () {

  return async (dispatch, getState) => {

    dispatch({ type: 'FETCH_QUESTIONS_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/questions`).then(response => response.json());

      let { results: questions } = response;

      if (!questions) throw response;

      dispatch({ type: 'FETCH_QUESTIONS_SUCCESS', questions });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FETCH_QUESTIONS_ERROR' });

    }

  }

}