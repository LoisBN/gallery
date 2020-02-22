import { picturesReducer } from './picturesReducer';
import { authReducer } from './authReducer';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

export default combineReducers({
  pictures: picturesReducer,
  form: formReducer,
  auth: authReducer
});
