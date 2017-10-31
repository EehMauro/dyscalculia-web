
const initialState = {
  isFetching: false,
  didInvalidate: false,
  success: false,
  token: null
};

export default function (state = initialState, action = {}) {

  switch (action.type) {

    case 'CREATE_FORM_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        success: true,
        token: action.token
      };

    case 'UPDATE_FORM_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        success: true
      };

    case 'CREATE_FORM_FETCHING':
    case 'UPDATE_FORM_FETCHING':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        success: false
      };

    case 'CREATE_FORM_ERROR':
    case 'UPDATE_FORM_ERROR':
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        success: false
      };

    default:
      return state;

  }

}
