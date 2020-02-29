export const authReducer = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case 'ERROR_SIGNUP':
      return { ...action.payload, authenticated: false };
    case 'ERROR_LOGIN':
      return { message: action.payload, authenticated: false };
    case 'LOGIN':
      return { ...action.payload, authenticated: true };
    case 'SIGNUP':
      return { ...action.payload, authenticated: true };
    case 'LOGOUT':
      return { authenticated: false };
    default:
      return state;
  }
};
