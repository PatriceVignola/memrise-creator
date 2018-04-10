/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import CourseSelectionScreen from '../dashboard/CourseSelectionScreen';

test('renders correctly', () => {
  const tree = renderer.create(<CourseSelectionScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
