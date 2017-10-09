
const initialState = {
  isFetching: false,
  didInvalidate: false,
  questions: null
};

export default function questions (state = initialState, action = {}) {

  switch (action.type) {

    case 'GET_QUESTIONS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        questions: action.questions
      };

    case 'GET_QUESTIONS_FETCHING':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        questions: null
      };

    case 'GET_QUESTIONS_ERROR':
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        questions: null
      };

    default:
      return state;

  }

}
