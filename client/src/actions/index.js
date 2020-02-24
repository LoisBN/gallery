import server from '../api/server';
import history from '../history/history';

export const signup = userInfo => async (dispatch, getState) => {
  const res = await server.post('/users/signup', userInfo);
  console.log(res.status);
  if (res.data.status === 422) {
    dispatch({
      type: 'ERROR_SIGNUP',
      payload: res.data
    });
  } else {
    window.localStorage.setItem('access_token', res.data.accessToken);
    console.log(res.data);
    dispatch({
      type: 'SIGNUP',
      payload: res.data
    });
    history.push('/');
  }
};

export const logout = () => (dispatch, getState) => {
  localStorage.removeItem('access_token');
  dispatch({
    type: 'LOGOUT'
  });
};

export const signin = userInfo => async (dispatch, getState) => {
  const res = await server
    .post('/users/login', userInfo)
    .then(r => {
      window.localStorage.setItem('access_token', r.data.accessToken);
      dispatch({
        type: 'LOGIN',
        payload: r.data
      });
      history.push('/');
    })
    .catch(reason => {
      console.log(reason);
      dispatch({
        type: 'ERROR_LOGIN',
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

export const search = section => async (dispatch, getState) => {
  const auth = getState().auth;
  if (!auth.authenticated) {
    dispatch({
      type: 'ERROR_UNAUTHORIZED_SEARCH',
      payload: 'you have to be authenticated to load this ressource'
    });
  } else {
    const res = await server.post('/search/' + section, {
      ...auth,
      section
    });
    dispatch({
      type: 'RESEARCH',
      payload: res.data
    });
  }
};
