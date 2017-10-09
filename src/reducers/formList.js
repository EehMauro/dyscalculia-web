
const initialState = {
  isFetching: false,
  didInvalidate: false,
  forms: null
};

export default function formList (state = initialState, action = {}) {

  switch (action.type) {

    case 'FORM_LIST_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        forms: action.forms
      };

    case 'FORM_LIST_FETCHING':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        forms: null
      };

    case 'FORM_LIST_ERROR':
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        forms: null
      };

    default:
      return state;

  }

}
