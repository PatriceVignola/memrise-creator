/* @flow */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  fetchCoursesAsync,
  fetchThingsAsync,
  fetchCurrentUserAsync,
} from '../fetchApi';

import type {
  ApiCourses,
  ApiLevels,
  ApiThings,
  ApiUser,
  ApiLeaderboard,
} from '../apiTypes';

import type {
  Course,
  CoursesThings,
  User,
} from '../types';

const mockStore = configureStore([thunk]);

const mockApiCourses: ApiCourses = {
  courses: [{
    id: 1909321,
    name: 'Activity Verbs (Korean)',
    slug: 'activity-verbs-korean',
    url: '/course/1909321/activity-verbs-korean/',
    description: '',
    photo: 'https://static.memrise.com/garden/img/placeholders/course-1.png',
    photo_small: 'https://static.memrise.com/garden/img/placeholders/course-1.png',
    photo_large: 'https://static.memrise.com/garden/img/placeholders/course-1.png',
    num_things: 9,
    num_levels: 1,
    num_learners: 1,
    source: {
      id: 6,
      slug: 'english',
      name: 'English',
      photo: 'https://static.memrise.com/uploads/category_photos/en.png',
      parent_id: 578,
      index: 1051,
      language_code: 'en',
    },
    target: {
      id: 8,
      slug: 'korean',
      name: 'Korean',
      photo: 'https://static.memrise.com/uploads/category_photos/korean-flag.png',
      parent_id: 614,
      index: 969,
      language_code: 'ko',
    },
    learned: 9,
    review: 9,
    ignored: 0,
    ltm: 0,
    difficult: 0,
    category: {
      name: 'Korean',
      photo: 'https://static.memrise.com/uploads/category_photos/korean-flag.png',
    },
    next_session: {
      next_session: {
        session_type: 'classic_review',
        is_enabled: true,
        counter: 0,
        url: '/course/1909321/activity-verbs-korean/garden/classic_review/',
        is_pro: false,
      },
      selector: [{
        session_type: 'learn',
        is_enabled: false,
        counter: 0,
        is_pro: false,
      }],
      is_unlocked: false,
    },
    percent_complete: 100,
    goal: {
      goal: 1500,
      points: 0,
      course_id: 1909321,
      streak: 0,
    },
  }],
};

const mockCourses: Course[] = [{
  description: '',
  id: 1909321,
  name: 'Activity Verbs (Korean)',
  numLearners: 1,
  numLevels: 1,
  numWords: 9,
  photoUrl: 'https://static.memrise.com/garden/img/placeholders/course-1.png',
  slug: 'activity-verbs-korean',
  source: {
    id: 6,
    index: 1051,
    languageCode: 'en',
    name: 'English',
    parentId: 578,
    photoUrl: 'https://static.memrise.com/uploads/category_photos/en.png',
    slug: 'english',
  },
  target: {
    id: 8,
    index: 969,
    languageCode: 'ko',
    name: 'Korean',
    parentId: 614,
    photoUrl: 'https://static.memrise.com/uploads/category_photos/korean-flag.png',
    slug: 'korean',
  },
}];

describe('fetchApi', () => {
  describe('calls fetchCoursesAsync()', () => {
    test('and dispatches FETCHED_COURSES after getting a successful response', () => {
      global.fetch = jest.fn().mockImplementationOnce(() => (
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => mockApiCourses,
          });
        })
      ));

      const store = mockStore({});

      return store.dispatch(fetchCoursesAsync())
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions).toHaveLength(1);
          expect(expectedActions).toContainEqual({
            type: 'FETCHED_COURSES',
            courses: mockCourses,
          });
        });
    });

    test('and dispatches FETCH_COURSES_FAILED after getting an error response', () => {
      const errorStatus = 403;

      global.fetch = jest.fn().mockImplementationOnce(() => (
        new Promise((resolve) => {
          resolve({
            ok: false,
            status: errorStatus,
          });
        })
      ));

      const store = mockStore({});
      const error = Error(`Response returned an error ${errorStatus}`);

      return store.dispatch(fetchCoursesAsync())
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions).toHaveLength(1);
          expect(expectedActions).toContainEqual({
            type: 'FETCH_COURSES_FAILED',
            error,
          });
        });
    });
  });

  describe('calls fetchThingsAsync()', () => {
    const mockApiThings: ApiThings = {
      things: [{
        id: 182780279,
        pool_id: 2911760,
        columns: {
          '1': {
            alts: [],
            val: '등산(을) 하다',
            choices: [
              '여랭(을) 하다',
              '신책(을) 하다',
              '수영(을) 하다',
              '이야기(를) 하다',
              '쇼핑(을) 라다',
              '영화를 보다',
              '사진을 찍다',
              '놀이공원에 가다',
            ],
            kind: 'text',
            accepted: [
              'deungsan(eul) hada',
              '등산(을) 하다',
            ],
            typing_corrects: {},
          },
          '2': {
            alts: [],
            val: 'to climb (a mountain)',
            choices: [
              'to have a conversation',
              'to travel',
              'to take a walk',
              'to go shopping',
              'to swim',
              'to take a picture',
              'to go to the amusement park',
              'to watch a movie',
            ],
            kind: 'text',
            accepted: [
              'to climb (a mountain)',
            ],
            typing_corrects: {},
          },
        },
        attributes: {},
      }],
    };

    const mockCoursesThings: CoursesThings = {
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
    };

    const mockApiLevels: ApiLevels = {
      levels: [{
        id: 7095326,
        index: 1,
        kind: 1,
        title: 'New level',
        pool_id: 2911760,
        column_a: 1,
        column_b: 2,
        thing_ids: [mockApiThings.things[0].id],
        course_id: mockApiCourses.courses[0].id,
        mission_id: null,
      }],
    };

    test('and dispatches FETCHED_THINGS after getting a successful response', () => {
      global.fetch = jest.fn().mockImplementationOnce(() => (
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => mockApiLevels,
          });
        })
      )).mockImplementationOnce(() => (
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => mockApiThings,
          });
        })
      ));

      const store = mockStore({});

      return store.dispatch(fetchThingsAsync(mockApiCourses.courses[0].id))
        .then(() => {
          const expectedActions = store.getActions();
          expect(global.fetch.mock.calls).toHaveLength(2);
          expect(expectedActions).toHaveLength(1);
          expect(expectedActions).toContainEqual({
            type: 'FETCHED_THINGS',
            coursesThings: mockCoursesThings,
          });
        });
    });

    describe('and dispatches FETCH_THINGS_FAILED', () => {
      const errorStatus = 403;

      test('after getting an error response when fetching levels', () => {
        global.fetch = jest.fn().mockImplementationOnce(() => (
          new Promise((resolve) => {
            resolve({
              ok: false,
              status: errorStatus,
            });
          })
        ));

        const store = mockStore({});
        const error = Error(`Response returned an error ${errorStatus}`);

        return store.dispatch(fetchThingsAsync(mockApiCourses.courses[0].id))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toHaveLength(1);
            expect(expectedActions).toContainEqual({
              type: 'FETCH_THINGS_FAILED',
              error,
            });
          });
      });

      test('after getting an error response when fetching things', () => {
        global.fetch = jest.fn().mockImplementationOnce(() => (
          new Promise((resolve) => {
            resolve({
              ok: true,
              json: () => mockApiLevels,
            });
          })
        )).mockImplementationOnce(() => (
          new Promise((resolve) => {
            resolve({
              ok: false,
              status: errorStatus,
            });
          })
        ));

        const store = mockStore({});
        const error = Error(`Response returned an error ${errorStatus}`);

        return store.dispatch(fetchThingsAsync(mockApiCourses.courses[0].id))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toHaveLength(1);
            expect(expectedActions).toContainEqual({
              type: 'FETCH_THINGS_FAILED',
              error,
            });
          });
      });
    });
  });

  describe('calls fetchCurrentUserAsync()', () => {
    const mockApiLeaderboard: ApiLeaderboard = {
      rows: [{
        position: 1,
        points: 28037,
        username: 'PatriceVignola21',
        uid: 18108732,
        photo: 'https://static.memrise.com/img/100sqf/from/uploads/profiles/PatriceVignola20_161023_0903_12.jpg',
        is_premium: false,
        following: true,
      }],
    };

    const mockApiUser: ApiUser = {
      user: {
        id: 18108732,
        email: null,
        username: 'PatriceVignola21',
        photo: 'https://static.memrise.com/uploads/profiles/PatriceVignola20_161023_0903_12.jpg',
        photo_small: 'https://static.memrise.com/img/100sqf/from/uploads/profiles/PatriceVignola20_161023_0903_12.jpg',
        photo_large: 'https://static.memrise.com/img/400sqf/from/uploads/profiles/PatriceVignola20_161023_0903_12.jpg',
        is_authenticated: true,
        is_staff: false,
        url: '/user/PatriceVignola21/',
        num_followers: 0,
        num_following: 0,
        num_things_flowered: 0,
        current_follows: false,
        follows_current: false,
        badges: {
          goal_streak: {
            level: 7,
            achieved_date: '2018-01-09T16:31:26Z',
            name: 'goal_streak',
          },
        },
        is_premium: false,
        is_self: true,
      },
    };

    const mockUser: User = {
      email: null,
      id: 18108732,
      photoUrl: 'https://static.memrise.com/uploads/profiles/PatriceVignola20_161023_0903_12.jpg',
      username: 'PatriceVignola21',
    };

    test('and dispatches FETCHED_CURRENT_USER after getting a successful response', () => {
      global.fetch = jest.fn().mockImplementationOnce(() => (
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => mockApiLeaderboard,
          });
        })
      )).mockImplementationOnce(() => (
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => mockApiUser,
          });
        })
      ));

      const store = mockStore({});

      return store.dispatch(fetchCurrentUserAsync())
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions).toHaveLength(1);
          expect(expectedActions).toContainEqual({
            type: 'FETCHED_CURRENT_USER',
            user: mockUser,
          });
        });
    });

    describe('and dispatches FETCH_CURRENT_USER_FAILED', () => {
      const errorStatus = 403;

      test('after getting an error response when fetching the leaderboard', () => {
        global.fetch = jest.fn().mockImplementationOnce(() => (
          new Promise((resolve) => {
            resolve({
              ok: false,
              status: errorStatus,
            });
          })
        ));

        const store = mockStore({});
        const error = Error(`Response returned an error ${errorStatus}`);

        return store.dispatch(fetchCurrentUserAsync())
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toHaveLength(1);
            expect(expectedActions).toContainEqual({
              type: 'FETCH_CURRENT_USER_FAILED',
              error,
            });
          });
      });

      test('after getting an error response when fetching the current user', () => {
        global.fetch = jest.fn().mockImplementationOnce(() => (
          new Promise((resolve) => {
            resolve({
              ok: true,
              json: () => mockApiLeaderboard,
            });
          })
        )).mockImplementationOnce(() => (
          new Promise((resolve) => {
            resolve({
              ok: false,
              status: errorStatus,
            });
          })
        ));

        const store = mockStore({});
        const error = Error(`Response returned an error ${errorStatus}`);

        return store.dispatch(fetchCurrentUserAsync())
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toHaveLength(1);
            expect(expectedActions).toContainEqual({
              type: 'FETCH_CURRENT_USER_FAILED',
              error,
            });
          });
      });
    });
  });
});
