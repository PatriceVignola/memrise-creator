/* @flow */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CourseSelectionScreen } from '../CourseSelectionScreen';

const renderer = new ShallowRenderer();

test('Matches snapshot', () => {
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

  const result = renderer.render((
    <CourseSelectionScreen
      dispatch={jest.fn()}
      courses={[course]}
    />
  ));
  expect(result).toMatchSnapshot();
});
