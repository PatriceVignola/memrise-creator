/* @flow */

import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

import CourseCard from './CourseCard';
import { fetchCoursesAsync, fetchCurrentUserAsync } from '../actions/fetchApi';
import { getCourses } from '../store/selectors';
import type { Course, ThunkAction } from '../actions/types';
import type { State } from '../store/selectors';

type Props = {
  courses: [Course],
  fetchCurrentUser: () => ThunkAction,
  fetchCourses: () => ThunkAction,
  navigation: NavigationScreenProp<NavigationRoute>,
};

// Name-export the unconnected component for tests
export class CourseSelectionScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.fetchCurrentUser();
    props.fetchCourses();
  }

  onCourseCardPress = (course: Course) => {
    this.props.navigation.navigate('CourseEdit', { course });
  }

  render() {
    return (
      // TODO: Put loading gif while the courses are loading
      <FlatList
        data={this.props.courses}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={this.onCourseCardPress}
          />
        )}
        keyExtractor={item => item.toString()}
      />
    );
  }
}

export default connect((state: State) => ({
  courses: getCourses(state),
}), {
  fetchCourses: fetchCoursesAsync,
  fetchCurrentUser: fetchCurrentUserAsync,
})(CourseSelectionScreen);
