/* @flow */

import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

import CourseCard from './CourseCard';
import { fetchCoursesAsync, fetchCurrentUserAsync } from '../actions/fetchApi';
import { getCourses } from '../store/selectors';
import type { Course, ThunkAction } from '../actions/types';
import type { State } from '../store/selectors';

type HigherOrderProps = {
  courses: Course[],
  navigation: NavigationScreenProp<NavigationRoute>,
};

type Props = {
  courses: Course[],
  fetchCurrentUser: () => ThunkAction,
  fetchCourses: () => ThunkAction,
  editCourse: (course: Course) => void,
};

// Name-export the unconnected component for tests
export class CourseList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.fetchCurrentUser();
    props.fetchCourses();
  }

  render() {
    return (
      // TODO: Put loading gif while the courses are loading
      <FlatList
        data={this.props.courses}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={this.props.editCourse}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

const enhance = compose(
  withHandlers({
    editCourse: (props: HigherOrderProps) => (course: Course) => {
      props.navigation.navigate('CourseEdit', { course });
    },
  }),
  withProps((props: HigherOrderProps) => ({
    courses: props.courses,
  })),
);

export default connect((state: State) => ({
  courses: getCourses(state),
}), {
  fetchCourses: fetchCoursesAsync,
  fetchCurrentUser: fetchCurrentUserAsync,
})(enhance(CourseList));
