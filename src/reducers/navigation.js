
const initialState = {
  title: null
};

export default function navigation (state = initialState, action = {}) {

  switch (action.type) {

    case 'SET_PAGE_TITLE':
      return {
        title: action.title
      };

    default:
      return state;

  }

}
