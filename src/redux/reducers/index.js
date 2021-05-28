import { combineReducers } from 'redux';
import authReducers from './authReducers';
import packageReducers from './packageReducers';

export default combineReducers({
  auth: authReducers,
  package: packageReducers,
});
