export const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'RESEARCH':
      return [...action.payload];
    case 'ERROR_UNAUTHORIZED_SEARCH':
      return 'You are not allowed to search if you have no account';
    default:
      return state;
  }
};
