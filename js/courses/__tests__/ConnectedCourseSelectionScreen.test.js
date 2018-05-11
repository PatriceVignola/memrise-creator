/* @flow */

import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ShallowRenderer from 'react-test-renderer/shallow';

import ConnectedCourseSelectionScreen from '../CourseSelectionScreen';

describe('CourseSelectionScreen', () => {
  const language = {
    id: 1,
    slug: 'Language Slug',
    name: 'Language',
    photoUrl: 'Language Photo Url',
    parentId: 1,
    index: 1,
    languageCode: 'Language Code',
  };

  const courses = [{
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
  }];

  const shallowRenderer = new ShallowRenderer();

  const navigation = addNavigationHelpers({
    state: {
      key: 'key',
      routeName: 'routeName',
      path: 'path',
    },
    dispatch: jest.fn(),
  });

  describe('connected with a store', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ courses });

    const connectedShallow = shallowRenderer.render((
      // $FlowFixMe Fixed in higher flow versions (e.g. 0.71.x), but react-native is still in 0.67
      <ConnectedCourseSelectionScreen store={store} navigation={navigation} />
    ));

    test('has props that match the store\'s initial state', () => {
      expect(connectedShallow.props.courses).toEqual(courses);
    });
  });
});
