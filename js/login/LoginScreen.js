/* @flow */

import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>,
};

export default class LoginScreen extends React.Component<Props> {
  handleGoogleLoginPress: () => void;

  constructor(props: Props) {
    super(props);

    this.handleGoogleLoginPress = this.handleGoogleLoginPress.bind(this);
  }

  handleGoogleLoginPress() {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'GoogleLogin' })],
    }));
  }

  render() {
    return (
      // TODO: Add the google logo
      // TODO: Style the button according to the guidelines
      // https://developers.google.com/identity/branding-guidelines#g+signin-social-scopes
      <Button onPress={this.handleGoogleLoginPress} title="Sign in with Google" />
    );
  }
}
