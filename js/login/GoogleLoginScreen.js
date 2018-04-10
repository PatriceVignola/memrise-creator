/* @flow */

import React from 'react';
import { WebView } from 'react-native';
import Url from 'url-parse';
import { NavigationActions } from 'react-navigation';
import loginWithGoogle from '../actions/login';

const googleLoginUrl = 'https://www.memrise.com/accounts/login/google-oauth2/';
const webViewUserAgent = 'Mozilla/5.0 (compatible; Trident/6.0; ARM; Touch)';

type Props = {
  navigation: Object,
};

export default class LoginForm extends React.Component<Props> {
  redirectUrl: ?Object;

  constructor(props: Props) {
    super(props);

    this.redirectUrl = null;
    (this: any).onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange(e: Object) {
    const url = new Url(e.url, true);

    if (url.query.redirect_uri !== undefined) {
      this.redirectUrl = new Url(url.query.redirect_uri);
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
