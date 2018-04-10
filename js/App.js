import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StackNavigator } from 'react-navigation';
import reducers from './reducers';
import LoginScreen from './login/LoginScreen';
import GoogleLoginScreen from './login/GoogleLoginScreen';
import CourseSelectionScreen from './dashboard/CourseSelectionScreen';

const initialState = {};
const MemriseCreator = StackNavigator({
  Login: { screen: LoginScreen },
  GoogleLogin: { screen: GoogleLoginScreen },
  CourseSelection: { screen: CourseSelectionScreen },
});

export default class App extends React.Component<{}> {
  store: any;

  constructor() {
    super();

    this.store = createStore(
      reducers,
      initialState,
      applyMiddleware(thunk),
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <MemriseCreator />
      </Provider>
    );
  }
}
