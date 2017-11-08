
const initialState = {
  isFetching: false,
  didInvalidate: false,
  count: null
};

export default function (state = initialState, action = {}) {

  switch (action.type) {

    case 'FORM_COUNT_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        count: action.count
      };

    case 'FORM_COUNT_FETCHING':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        count: null
      };

    case 'FORM_COUNT_ERROR':
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        count: null
      };

    default:
      return state;

  }

}
