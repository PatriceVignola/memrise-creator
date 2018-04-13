/* @flow */

import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import fetchCoursesAsync from '../actions/fetchApi';
import type { Course } from '../reducers/courses';
import type { Action } from '../actions/types';
import CourseCard from './CourseCard';

type Props = {
  courses: Course[],
  dispatch: ((Action => void) => Promise<Action>) => void,
};

type State = {
  courses: Course[],
};

// Name-export the unconnected component for tests
export class CourseSelectionScreen extends React.Component<Props> {
  componentDidMount() {
    console.warn('did mount');
    this.props.dispatch(fetchCoursesAsync());
  }

  render() {
    return (
      // TODO: Put loading gif while the courses are loading
      <FlatList
        data={this.props.courses}
        renderItem={(info: { item: Course }) => (
          <CourseCard course={info.item} />
        )}
      />
    );
  }
}

function mapStateToProps(state: State) {
  return {
    courses: state.courses,
  };
}

export default connect(mapStateToProps)(CourseSelectionScreen);
