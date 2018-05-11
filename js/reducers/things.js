/* @flow */

import type { Action, CoursesThings } from '../actions/types';

const initialState = {};

function coursesThings(state: CoursesThings = initialState, action: Action): CoursesThings {
  if (action.type === 'FETCHED_THINGS') {
    return {
      ...state,
      ...action.coursesThings,
    };
  }

  return state;
}

export default coursesThings;
