/* @flow */

import type { Course, CoursesThings } from '../actions/types';

export type State = {
  coursesThings: CoursesThings,
  courses: [Course],
};

export const getCoursesThings = (state: State) => state.coursesThings;
export const getCourses = (state: State) => state.courses;
