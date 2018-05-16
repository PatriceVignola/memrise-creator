/* @flow */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import CourseCard from './CourseCard';

const shallowRenderer = new ShallowRenderer();

describe('CourseCard', () => {
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

  const mockPressFunction = jest.fn();

  const wrapper = shallowRenderer.render((
    <CourseCard
      course={course}
      onPress={mockPressFunction}
    />
  ));

  test('shows course info', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('can be clicked', () => {
    wrapper.props.onPress();
    expect(mockPressFunction).toHaveBeenCalled();
  });
});
