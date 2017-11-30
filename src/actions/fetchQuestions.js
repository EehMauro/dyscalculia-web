import { API_URL } from '../conventions';

function preloadImages (questions) {
  let images = [];
  let preloaded = [];
  for (let question of questions) {
    if (question.image) images.push(question.image);
    if (question.type === 'image-multiple-choice-question') {
      images.push(...question.options);
    }
  }
  for (let i = 0; i < images.length; i++) {
    preloaded[i] = new Image();
    preloaded[i].src = images[i];
  }
}

export default function () {

  return async (dispatch, getState) => {

    dispatch({ type: 'FETCH_QUESTIONS_FETCHING' });

    try {

      let response = await fetch(`${ API_URL }/questions`).then(response => response.json());

      let { results: questions } = response;

      if (!questions) throw response;

      preloadImages(questions);

      dispatch({ type: 'FETCH_QUESTIONS_SUCCESS', questions });

    } catch (error) {

      console.log(error);

      dispatch({ type: 'FETCH_QUESTIONS_ERROR' });

    }

  }

}