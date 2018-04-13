/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import {
  type Store,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { StackNavigator } from 'react-navigation';
import reducers from './reducers';
import LoginScreen from './login/LoginScreen';
import GoogleLoginScreen from './login/GoogleLoginScreen';
import ConnectedCourseSelectionScreen from './courses/CourseSelectionScreen';
import type { Action } from './actions/types';

const initialState = {};
const MemriseCreator = StackNavigator({
  Login: { screen: LoginScreen },
  GoogleLogin: { screen: GoogleLoginScreen },
  CourseSelection: { screen: ConnectedCourseSelectionScreen },
});

class App extends React.Component<{}> {
  store: Store<Object, Action>;

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

export default App;
