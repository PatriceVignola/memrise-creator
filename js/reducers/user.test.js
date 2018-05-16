/* @flow */

import user from './user';
import type { User } from '../actions/types';

describe('user reucer', () => {
  const mockUser: User = {
    email: null,
    id: 18108732,
    photoUrl: 'https://static.memrise.com/uploads/profiles/PatriceVignola20_161023_0903_12.jpg',
    username: 'PatriceVignola21',
  };

  test('overwrites the old user when receiving FETCHED_CURRENT_USER', () => {
    const mockInitialUser: User = {
      email: 'abcd@abc.com',
      id: 12345678,
      photoUrl: 'https://photourl.com',
      username: 'InitialUser76',
    };

    const mockAction = {
      type: 'FETCHED_CURRENT_USER',
      user: mockUser,
    };

    const state = user(mockInitialUser, mockAction);
    expect(state).toEqual(mockUser);
  });

  test('returns the initial state when not receiving FETCHED_CURRENT_USER', () => {
    const mockAction = {
      type: 'FETCHED_COURSES',
      courses: [],
    };

    const state = user(mockUser, mockAction);
    expect(state).toEqual(mockUser);
  });
});
