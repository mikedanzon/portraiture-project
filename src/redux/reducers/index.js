import { combineReducers } from 'redux';
import authReducers from './authReducers';
import packageReducers from './packageReducers';
import projectReducers from './projectReducers';

export default combineReducers({
  auth: authReducers,
  package: packageReducers,
  project: projectReducers,
});
