/* @flow */

import React from 'react';
import { WebView } from 'react-native';
import {
  type NavigationScreenProp,
  NavigationActions,
} from 'react-navigation';
import loginWithGoogle from '../actions/login';

const googleLoginUrl = 'https://www.memrise.com/accounts/login/google-oauth2/';
const webViewUserAgent = 'Mozilla/5.0 (compatible; Trident/6.0; ARM; Touch)';

type Props = {
  navigation: NavigationScreenProp<any>,
};

type StateChangeData = {
  url: string,
};

export default class GoogleLoginScreen extends React.Component<Props> {
  redirectUrl: ?URL;

  constructor(props: Props) {
    super(props);

    this.redirectUrl = null;
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange = (e: StateChangeData) => {
    const url = new URL(e.url);
    const redirectUri = url.searchParams.get('redirect_uri');

    if (redirectUri !== undefined) {
      this.redirectUrl = new URL(redirectUri);
    } else if (this.redirectUrl && url.pathname === this.redirectUrl.pathname) {
      loginWithGoogle();

      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'CourseSelection' })],
      }));
    }
  }

  render() {
    return (
      <WebView
        source={{ uri: googleLoginUrl }}
        onNavigationStateChange={this.onNavigationStateChange}
        userAgent={webViewUserAgent}
      />
    );
  }
}
