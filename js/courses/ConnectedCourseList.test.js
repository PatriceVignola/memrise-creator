/* @flow */

import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import configureStore from 'redux-mock-store';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import thunk from 'redux-thunk';

import ConnectedCourseList from './ConnectedCourseList';
import CourseList from './CourseList';

describe('ConnectedCourseList', () => {
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

  const mockStore = configureStore([thunk]);
  const store = mockStore({ courses });

  test('has props that match the store\'s initial state', () => {
    const shallow = shallowRenderer.render((
      <ConnectedCourseList store={store} navigation={navigation} />
    ));

    expect(shallow.props.courses).toEqual(courses);
  });

  test('has handler props', () => {
    const mockNavigateFunction = jest.fn();
    navigation.navigate = mockNavigateFunction;

    const deep = Renderer.create((
      <ConnectedCourseList store={store} navigation={navigation} />
    ));

    deep.root.findByType(CourseList).props.editCourse(courses[0]);

    expect(mockNavigateFunction).toHaveBeenCalledTimes(1);
    expect(mockNavigateFunction).toBeCalledWith('CourseEdit', { course: courses[0] });
  });
});
