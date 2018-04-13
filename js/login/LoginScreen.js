/* @flow */

import React from 'react';
import { Button } from 'react-native';
import {
  type NavigationScreenProp,
  NavigationActions,
} from 'react-navigation';
import loginWithGoogle from '../actions/login';

type Props = {
  navigation: NavigationScreenProp<any>,
};

export default class LoginScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onGoogleLoginPress = this.onGoogleLoginPress.bind(this);
  }

  onGoogleLoginPress = () => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'GoogleLogin' })],
    }));

    loginWithGoogle();
  }

  render() {
    return (
      // TODO: Add the google logo
      // TODO: Style the button according to the guidelines
      // https://developers.google.com/identity/branding-guidelines#g+signin-social-scopes
      <Button onPress={this.onGoogleLoginPress} title="Sign in with Google" />
    );
  }
}
