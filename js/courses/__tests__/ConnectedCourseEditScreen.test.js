/* @flow */

import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ShallowRenderer from 'react-test-renderer/shallow';

import ConnectedCourseEditScreen from '../CourseEditScreen';

describe('CourseEditScreen', () => {
  const language = {
    id: 1,
    slug: 'Language Slug',
    name: 'Language',
    photoUrl: 'Language Photo Url',
    parentId: 1,
    index: 1,
    languageCode: 'Language Code',
  };

  const course = {
    description: 'Course Description',
    id: 1,
    name: 'Course',
    numLearners: 1,
    numLevels: 1,
    numWords: 1,
    photoUrl: 'Course Photo Url',
    slug: 'Course Slug',
    source: language,
    target: language,
  };

  const thingLanguage = {
    word: 'abc',
    kind: 'text',
    alts: ['def'],
  };

  const coursesThings = {
    [course.id]: [{
      id: 1,
      source: thingLanguage,
      target: thingLanguage,
    }],
  };

  const shallowRenderer = new ShallowRenderer();

  const navigation = addNavigationHelpers({
    state: {
      key: 'key',
      routeName: 'routeName',
      path: 'path',
      params: {
        course,
      },
    },
    dispatch: jest.fn(),
  });

  describe('connected with a store', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ coursesThings });

    const connectedShallow = shallowRenderer.render((
      // $FlowFixMe Fixed in higher flow versions (e.g. 0.71.x), but react-native is still in 0.67
      <ConnectedCourseEditScreen store={store} navigation={navigation} />
    ));

    test('has props that match the store\'s initial state', () => {
      expect(connectedShallow.props.coursesThings).toEqual(coursesThings);
    });
  });
});
