/* @flow */

import React from 'react';
import { FlatList } from 'react-native';

import CourseCard from './CourseCard';
import type { Course } from '../actions/types';

type Props = {
  courses: Course[],
  editCourse: (course: Course) => void,
};

function CourseList(props: Props) {
  return (
    // TODO: Put loading gif while the courses are loading
    <FlatList
      data={props.courses}
      renderItem={({ item }) => (
        <CourseCard
          course={item}
          onPress={props.editCourse}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

export default CourseList;
