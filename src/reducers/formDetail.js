
const initialState = {
  isFetching: false,
  didInvalidate: false,
  form: null
};

export default function (state = initialState, action = {}) {

  switch (action.type) {

    case 'FORM_DETAIL_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        form: action.form
      };

    case 'FORM_DETAIL_FETCHING':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        form: null
      };

    case 'FORM_DETAIL_ERROR':
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        form: null
      };

    default:
      return state;

  }

}
