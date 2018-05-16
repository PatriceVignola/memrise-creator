/* @flow */

import courses from './courses';
import type { Course } from '../actions/types';

describe('courses reducer', () => {
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

  test('overwrites the old courses when receiving FETCHED_COURSES', () => {
    const mockInitialState: Course[] = [{
      description: '',
      id: 1909393,
      name: 'Adjectives (Korean)',
      numLearners: 1,
      numLevels: 1,
      numWords: 46,
      photoUrl: 'https://static.memrise.com/garden/img/placeholders/course-3.png',
      slug: 'adjectives-korean',
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

    const mockAction = {
      type: 'FETCHED_COURSES',
      courses: mockCourses,
    };

    const state = courses(mockInitialState, mockAction);
    expect(state).toEqual(mockCourses);
  });

  test('returns the initial state when not receiving FETCHED_COURSES', () => {
    const mockAction = {
      type: 'FETCHED_THINGS',
      coursesThings: { [1]: [] },
    };

    const state = courses(mockCourses, mockAction);
    expect(state).toEqual(mockCourses);
  });
});
