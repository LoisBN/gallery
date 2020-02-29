import { picturesReducer } from './picturesReducer';
import { authReducer } from './authReducer';
import { searchReducer } from './searchReducer';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

export default combineReducers({
  pictures: picturesReducer,
  form: formReducer,
  auth: authReducer,
  search: searchReducer
});
