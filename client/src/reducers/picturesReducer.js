export const picturesReducer = (state = { hello: 'world' }, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return action.payload;
    default:
      return state;
  }
};
