import server from '../api/server';

export const signup = userInfo => async (dispatch, getState) => {
  const res = await server.post('/users/signup', userInfo);
  window.localStorage.setItem('access_token', res.data.accessToken);
  console.log(res.data);
  dispatch({
    type: 'SIGNUP',
    payload: res.data
  });
};

export const logout = () => (dispatch, getState) => {
  localStorage.removeItem('access_token');
  dispatch({
    type: 'LOGOUT',
    payload: { authenticated: false }
  });
};

export const signin = userInfo => async (dispatch, getState) => {
  const res = await server
    .post('/users/login', userInfo)
    .then(r => {
      window.localStorage.setItem('access_token', r.data.accessToken);
      dispatch({
        type: 'SIGNIN',
        payload: r.data
      });
    })
    .catch(reason => {
      console.log(reason);
      dispatch({
        type: 'ERROR',
        payload: 'wrong username or password'
      });
    });
};

export const autologin = accessToken => async (dispatch, getState) => {
  if (accessToken !== null) {
    const res = await server.post('/users/account', { accessToken });
    console.log(res.data);
    dispatch({
      type: 'LOGIN',
      payload: res.data
    });
  }
};

export const fetchPosts = () => (dispatch, getState) => {};
