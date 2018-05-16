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
import type { Action } from './actions/types';
import reducers from './reducers';
import Login from './login/Login';
import GoogleLogin from './login/GoogleLogin';
import ConnectedCourseList from './courses/ConnectedCourseList';
import ConnectedCourseEdit from './courses/CourseEdit';

const initialState = {};
const MemriseCreator = StackNavigator({
  Login: { screen: Login },
  GoogleLogin: { screen: GoogleLogin },
  CourseList: { screen: ConnectedCourseList },
  CourseEdit: { screen: ConnectedCourseEdit },
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
