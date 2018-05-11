/* @flow */

import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoginScreen from '../LoginScreen';

const shallowRenderer = new ShallowRenderer();

describe('LoginScreen', () => {
  const mockDispatchFunction = jest.fn();

  const navigation = addNavigationHelpers({
    state: {
      key: 'key',
      routeName: 'routeName',
      path: 'path',
    },
    dispatch: mockDispatchFunction,
  });

  test('renders a login page', () => {
    const shallow = shallowRenderer.render((
      <LoginScreen
        navigation={navigation}
      />
    ));
    expect(shallow).toMatchSnapshot();
  });

  test('navigates to GoogleLoginScreen when clicking a course card', () => {
    const mockResetObject = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'GoogleLogin' })],
    });

    const deep = Renderer.create((
      <LoginScreen
        navigation={navigation}
      />
    ));

    deep.root.findByProps({ title: 'Sign in with Google' }).props.onPress();

    expect(mockDispatchFunction).toHaveBeenCalledTimes(1);
    expect(mockDispatchFunction).toHaveBeenCalledWith(mockResetObject);
  });
});
