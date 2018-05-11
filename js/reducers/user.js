/* @flow */

import type { Action, User } from '../actions/types';

const initialState = null;

function user(state: ?User = initialState, action: Action): ?User {
  if (action.type === 'FETCHED_CURRENT_USER') {
    return action.user;
  }

  return state;
}

export default user;
