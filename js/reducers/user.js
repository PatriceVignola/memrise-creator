/* @flow */

import type { Action } from '../actions/types';

export type User = {
  isLoggedIn: boolean,
  id: ?string,
  name: ?string,
}

const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
};

function user(state: User = initialState, action: Action): User {
  if (action.type === 'LOGGED_IN') {
    return {
      isLoggedIn: true,
      id: 'PlaceholderID',
      name: 'PlaceholderName',
    };
  }

  return state;
}

export default user;
