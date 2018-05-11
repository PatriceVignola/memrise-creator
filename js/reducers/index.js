/* @flow */

import { combineReducers } from 'redux';
import user from './user';
import courses from './courses';
import coursesThings from './things';

const reducers = combineReducers({
  user,
  courses,
  coursesThings,
});

export default reducers;
