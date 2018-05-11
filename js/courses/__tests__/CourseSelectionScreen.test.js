/* @flow */

import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import CourseCard from '../CourseCard';
import { CourseSelectionScreen } from '../CourseSelectionScreen';

const shallowRenderer = new ShallowRenderer();

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

  const mockNavigateFunction = jest.fn();
  const navigation = addNavigationHelpers({
    state: {
      key: 'key',
      routeName: 'routeName',
      path: 'path',
    },
    dispatch: jest.fn(),
  });

  navigation.navigate = mockNavigateFunction;

  test('renders courses', () => {
    const shallow = shallowRenderer.render((
      <CourseSelectionScreen
        navigation={navigation}
        courses={[course]}
        fetchCurrentUser={jest.fn()}
        fetchCourses={jest.fn()}
      />
    ));
    expect(shallow).toMatchSnapshot();
  });

  test('navigates to CourseEditScreen when clicking a course card', () => {
    const deep = Renderer.create((
      <CourseSelectionScreen
        navigation={navigation}
        courses={[course]}
        fetchCurrentUser={jest.fn()}
        fetchCourses={jest.fn()}
      />
    ));

    deep.root.findByType(CourseCard).props.onPress(course);
    expect(mockNavigateFunction).toHaveBeenCalledTimes(1);
    expect(mockNavigateFunction).toHaveBeenCalledWith('CourseEdit', {
      course,
    });
  });
});
