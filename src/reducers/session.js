
const initialState = {
  sessionIsFetching: false,
  didSessionInvalidate: false,
  loginIsFetching: false,
  didLoginInvalidate: false,
  token: null,
  profile: null
};

export default function (state = initialState, action = {}) {

  switch (action.type) {

    case 'LOGIN':
      return {
        ...state,
        loginIsFetching: false,
        didLoginInvalidate: false,
        token: action.token
      };

    case 'LOGIN_FETCHING':
      return {
        ...state,
        loginIsFetching: true,
        didLoginInvalidate: false,
        token: null
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        loginIsFetching: false,
        didLoginInvalidate: true,
        token: null
      };

    case 'SESSION':
      return {
        ...state,
        sessionIsFetching: false,
        didSessionInvalidate: false,
        profile: action.profile
      };

    case 'SESSION_FETCHING':
      return {
        ...state,
        sessionIsFetching: true,
        didSessionInvalidate: false,
        profile: null
      };

    case 'SESSION_CLOSE':
    case 'SESSION_NOT_EXISTS':
    case 'SESSION_ERROR':
      return {
        ...state,
        sessionIsFetching: false,
        didSessionInvalidate: true,
        token: null,
        profile: null
      };

    default:
      return state;

  }

}
