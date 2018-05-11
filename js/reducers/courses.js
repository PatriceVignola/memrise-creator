/* @flow */

import type { Action, Course } from '../actions/types';

const initialState = [];

function courses(state: Course[] = initialState, action: Action): Course[] {
  if (action.type === 'FETCHED_COURSES') {
    return action.courses;
  }

  return state;
}

export default courses;
