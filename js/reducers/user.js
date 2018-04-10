import type { Action } from '../actions/types';

export type State = {
  isLoggedIn: boolean,
  id: ?string,
  name: ?string,
}

const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
};

function user(state: State = initialState, action: Action): State {
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
