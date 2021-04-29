import { combineReducers } from 'redux';
import Reducers from './authReducers';

export default combineReducers({
  auth: Reducers,
});
