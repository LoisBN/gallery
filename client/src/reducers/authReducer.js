export const authReducer = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return { ...action.payload, authenticated: true };
    case 'LOGIN':
      return { ...action.payload, authenticated: true };
    case 'SIGNUP':
      return action.payload;
    default:
      return { authenticated: false };
  }
};
