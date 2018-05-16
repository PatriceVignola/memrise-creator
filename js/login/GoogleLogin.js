/* @flow */

import React from 'react';
import { WebView } from 'react-native';

import {
  type NavigationScreenProp,
  NavigationActions,
} from 'react-navigation';

import URL, { type Url } from 'url-parse';

const googleLoginUrl = 'https://www.memrise.com/accounts/login/google-oauth2/';
const webViewUserAgent = 'Mozilla/5.0 (compatible; Trident/6.0; ARM; Touch)';

type Props = {
  navigation: NavigationScreenProp<any>,
};

// TODO: Complete this def and move it into a libdef for WebView
export type StateChangeData = {
  url: string,
};

export default class GoogleLogin extends React.Component<Props> {
  redirectUrl: ?Url;

  constructor(props: Props) {
    super(props);

    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange = (e: StateChangeData) => {
    const url = new URL(e.url, true);

    if (url.query.redirect_uri) {
      this.redirectUrl = new URL(url.query.redirect_uri);
    } else if (this.redirectUrl && url.pathname === this.redirectUrl.pathname) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'CourseList' })],
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
