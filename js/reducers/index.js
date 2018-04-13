/* @flow */

import { combineReducers } from 'redux';
import user from './user';
import courses from './courses';

const reducers = combineReducers({
  user,
  courses,
});

export default reducers;
