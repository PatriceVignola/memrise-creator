/* @flow */

import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { WebView } from 'react-native';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import GoogleLogin from './GoogleLogin';
import type { StateChangeData } from './GoogleLogin';

const shallowRenderer = new ShallowRenderer();

describe('GoogleLogin', () => {
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

  test('renders the Google Login', () => {
    const shallow = shallowRenderer.render((
      <GoogleLogin
        navigation={navigation}
      />
    ));
    expect(shallow).toMatchSnapshot();
  });

  test('navigates to CourseList after redirecting', () => {
    const mockResetObject = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'CourseList' })],
    });

    const deep = Renderer.create((
      <GoogleLogin
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
      <GoogleLogin
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
