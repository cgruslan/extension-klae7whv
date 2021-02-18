import { combineReducers } from 'redux';

import currentTask from './currentTask';
import businessNames from './businessNames';
import businesses from './businesses';

export default combineReducers({
  currentTask,
  businessNames,
  businesses,
});
