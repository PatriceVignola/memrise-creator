/* @flow */

import React from 'react';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import CourseCard from './CourseCard';
import { CourseList } from './CourseList';

const shallowRenderer = new ShallowRenderer();

describe('CourseList', () => {
  const language = {
    id: 1,
    slug: 'Language Slug',
    name: 'Language',
    photoUrl: 'Language Photo Url',
    parentId: 1,
    index: 1,
    languageCode: 'Language Code',
  };

  const course = {
    description: 'Course Description',
    id: 1,
    name: 'Course',
    numLearners: 1,
    numLevels: 1,
    numWords: 1,
    photoUrl: 'Course Photo Url',
    slug: 'Course Slug',
    source: language,
    target: language,
  };

  const mockEditCourseFunction = jest.fn();

  test('renders courses', () => {
    const shallow = shallowRenderer.render((
      <CourseList
        editCourse={jest.fn()}
        courses={[course]}
        fetchCurrentUser={jest.fn()}
        fetchCourses={jest.fn()}
      />
    ));
    expect(shallow).toMatchSnapshot();
  });

  test('navigates to CourseEditScreen when clicking a course card', () => {
    const deep = Renderer.create((
      <CourseList
        editCourse={mockEditCourseFunction}
        courses={[course]}
        fetchCurrentUser={jest.fn()}
        fetchCourses={jest.fn()}
      />
    ));

    deep.root.findByType(CourseCard).props.onPress(course);
    expect(mockEditCourseFunction).toHaveBeenCalledTimes(1);
    expect(mockEditCourseFunction).toHaveBeenCalledWith(course);
  });
});
