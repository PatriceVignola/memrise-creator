/* @flow */

import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withProps } from 'recompose';

import CourseList from './CourseList';
import { fetchCoursesAsync, fetchCurrentUserAsync } from '../actions/fetchApi';
import { getCourses } from '../store/selectors';
import type { State } from '../store/selectors';
import type { Course } from '../actions/types';

type Props = {
  courses: Course[],
  navigation: NavigationScreenProp<NavigationRoute>,
};

const connectToStore = connect((state: State) => ({
  courses: getCourses(state),
}), {
  fetchCourses: fetchCoursesAsync,
  fetchCurrentUser: fetchCurrentUserAsync,
});

const setHandlers = withHandlers({
  editCourse: (props: Props) => (course: Course) => {
    props.navigation.navigate('CourseEdit', { course });
  },
});

const setProps = withProps((props: Props) => ({
  courses: props.courses,
}));

const setAsyncFetch = lifecycle({
  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchCurrentUser();
  },
});

const enhance = compose(
  connectToStore,
  setHandlers,
  setProps,
  setAsyncFetch,
);

export default enhance(CourseList);
