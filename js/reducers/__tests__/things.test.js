/* @flow */

import things from '../things';
import type { CoursesThings } from '../../actions/types';

describe('things reducer', () => {
  const mockCoursesThings: CoursesThings = {
    [1909321]: [{
      id: 182780279,
      source: {
        alts: [],
        kind: 'text2',
        word: 'to climb (a mountain)2',
      },
      target: {
        alts: [],
        kind: 'text2',
        word: '등산(을) 하다2',
      },
    }],
  };

  test('returns the updated state when receiving FETCHED_THINGS', () => {
    const mockInitialState: CoursesThings = {
      [1909321]: [{
        id: 182780279,
        source: {
          alts: [],
          kind: 'text',
          word: 'to climb (a mountain)',
        },
        target: {
          alts: [],
          kind: 'text',
          word: '등산(을) 하다',
        },
      }],

      [1909393]: [{
        id: 183009094,
        source: {
          alts: [],
          kind: 'text',
          word: 'to be tired',
        },
        target: {
          alts: [],
          kind: 'text',
          word: '피곤하다',
        },
      }],
    };

    const mockAction = {
      type: 'FETCHED_THINGS',
      coursesThings: mockCoursesThings,
    };

    const state = things(mockInitialState, mockAction);
    expect(state).toEqual({ ...mockInitialState, ...mockCoursesThings });
  });

  test('returns the initial state when not receiving FETCHED_COURSES', () => {
    const mockAction = {
      type: 'FETCHED_COURSES',
      courses: [],
    };

    const state = things(mockCoursesThings, mockAction);
    expect(state).toEqual(mockCoursesThings);
  });
});
