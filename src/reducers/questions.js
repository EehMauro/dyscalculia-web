
const initialState = {
  isFetching: false,
  didInvalidate: false,
  questions: null
};

export default function (state = initialState, action = {}) {

  switch (action.type) {

    case 'FETCH_QUESTIONS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        questions: action.questions
      };

    case 'FETCH_QUESTIONS_FETCHING':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        questions: null
      };

    case 'FETCH_QUESTIONS_ERROR':
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
