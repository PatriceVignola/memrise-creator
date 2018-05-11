/* @flow */

import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { WebView } from 'react-native';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import GoogleLoginScreen from '../GoogleLoginScreen';
import type { StateChangeData } from '../GoogleLoginScreen';

const shallowRenderer = new ShallowRenderer();

describe('GoogleLoginScreen', () => {
  const mockDispatchFunction = jest.fn();

  const navigation = addNavigationHelpers({
    state: {
      key: 'key',
      routeName: 'routeName',
      path: 'path',
    },
    dispatch: mockDispatchFunction,
  });

  afterEach(() => {
    mockDispatchFunction.mockClear();
  });

  test('renders the Google Login Screen', () => {
    const shallow = shallowRenderer.render((
      <GoogleLoginScreen
        navigation={navigation}
      />
    ));
    expect(shallow).toMatchSnapshot();
  });

  test('navigates to CourseSelectionScreen after redirecting', () => {
    const mockResetObject = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'CourseSelection' })],
    });

    const deep = Renderer.create((
      <GoogleLoginScreen
        navigation={navigation}
      />
    ));

    const mockStateChangeUrl: StateChangeData = {
      url: 'https://url.com?redirect_uri=https://url.com/redirect_path',
    };

    const mockStateChangeRedirect: StateChangeData = {
      url: 'https://url.com/redirect_path',
    };

    deep.root.findByType(WebView).props.onNavigationStateChange(mockStateChangeUrl);
    deep.root.findByType(WebView).props.onNavigationStateChange(mockStateChangeRedirect);

    expect(mockDispatchFunction).toHaveBeenCalledTimes(1);
    expect(mockDispatchFunction).toHaveBeenCalledWith(mockResetObject);
  });

  test('does not redirect if the redirect url is not equal to redirect_uri', () => {
    const deep = Renderer.create((
      <GoogleLoginScreen
        navigation={navigation}
      />
    ));

    const mockStateChangeUrl: StateChangeData = {
      url: 'https://url.com?redirect_uri=https://url.com/redirect_path',
    };

    const mockStateChangeBadRedirect: StateChangeData = {
      url: 'https://url.com/bad_redirect_path',
    };

    deep.root.findByType(WebView).props.onNavigationStateChange(mockStateChangeUrl);
    deep.root.findByType(WebView).props.onNavigationStateChange(mockStateChangeBadRedirect);

    expect(mockDispatchFunction).toHaveBeenCalledTimes(0);
  });
});
