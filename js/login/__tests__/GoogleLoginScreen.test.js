/* @flow */

import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import ShallowRenderer from 'react-test-renderer/shallow';
import GoogleLoginScreen from '../GoogleLoginScreen';

const renderer = new ShallowRenderer();

test('Matches snapshot', () => {
  const navigation = addNavigationHelpers({
    state: {},
    dispatch: jest.fn(),
  });

  const result = renderer.render((
    <GoogleLoginScreen
      navigation={navigation}
    />
  ));
  expect(result).toMatchSnapshot();
});
