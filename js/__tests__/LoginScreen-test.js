/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../login/LoginScreen';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create(<LoginScreen navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
