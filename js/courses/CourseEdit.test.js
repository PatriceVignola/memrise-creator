/* @flow */

import React from 'react';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { addNavigationHelpers } from 'react-navigation';
import { WebView } from 'react-native';
import { FAB } from 'react-native-paper';

import { CourseEditScreen } from './CourseEdit';
import ThingListItem from '../things/ThingListItem';

describe('CourseEditScreen', () => {
  const shallowRenderer = new ShallowRenderer();

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

  const thingLanguage = {
    word: 'abc',
    kind: 'text',
    alts: ['def'],
  };

  const coursesThings = {
    [course.id]: [{
      id: 1,
      source: thingLanguage,
      target: thingLanguage,
    }],
  };

  describe('with a course parameter', () => {
    const mockNavigateFunction = jest.fn();

    const navigation = addNavigationHelpers({
      state: {
        key: 'key',
        routeName: 'routeName',
        path: 'path',
        params: {
          course,
        },
      },
      dispatch: jest.fn(),
    });

    navigation.navigate = mockNavigateFunction;

    const deep = Renderer.create((
      <CourseEditScreen
        navigation={navigation}
        coursesThings={coursesThings}
        fetchThings={jest.fn()}
      />
    ));

    const mockInjectJavaScriptFunction = jest.fn();
    deep.root.findByType(WebView).instance.injectJavaScript = mockInjectJavaScriptFunction;

    test('renders a list of things for the course', () => {
      const shallow = shallowRenderer.render((
        <CourseEditScreen
          navigation={navigation}
          coursesThings={coursesThings}
          fetchThings={jest.fn()}
        />
      ));

      expect(shallow).toMatchSnapshot();
    });

    test('injects JavaScript into WebView when clicking the `add` button', () => {
      deep.root.findByType(FAB).props.onPress();
      expect(mockInjectJavaScriptFunction).toHaveBeenCalledTimes(1);
    });

    // TODO: Split the things list into a ThingList component to improve modularity and testing
    test('navigates to ThingEditScreen when clicking a thing', () => {
      deep.root.findByType(ThingListItem).props.onPress(coursesThings[course.id]);
      expect(mockNavigateFunction).toHaveBeenCalledTimes(1);
      expect(mockNavigateFunction).toHaveBeenCalledWith('ThingEdit', {
        thing: coursesThings[course.id],
      });
    });

    // TODO: Split the WebView component into its own component to improve modularity and testing
    test('has a WebView with the Course Edit URL', () => {
      const courseEditUrl = `https://memrise.com/course/${course.id}/${course.slug}/edit`;
      expect(deep.root.findByType(WebView).props.source.uri).toBe(courseEditUrl);
    });
  });

  describe('without a course parameter', () => {
    test('shows a loading screen', () => {
      const navigation = addNavigationHelpers({
        state: {
          key: 'key',
          routeName: 'routeName',
          path: 'path',
        },
        dispatch: jest.fn(),
      });

      const deep = Renderer.create((
        <CourseEditScreen
          navigation={navigation}
          coursesThings={{}}
          fetchThings={jest.fn()}
        />
      ));

      expect(deep).toMatchSnapshot();
    });
  });
});
