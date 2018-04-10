/* @flow */

import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native';
import getCoursesAsync from '../api/courseApi';

type State = {
  // TODO: Strongly type courses with the type from courseApi
  courses: Array<Object>,
  loadingCourses: boolean,
  courseUrl: string,
};

export default class CourseSelectionScreen extends React.Component<{}, State> {
  webView: WebView;

  constructor() {
    super();

    this.state = {
      // TODO: See if we can make it strongly typed with Flow
      courses: [],
      loadingCourses: true,
      courseUrl: 'https://www.memrise.com/course/1908937/test-korean-3/edit/#l_7094047',
    };

    this.webView = null;

    (this: any).onAddPress = this.onAddPress.bind(this);
  }

  componentDidMount() {
    console.warn('did mount');
    getCoursesAsync().then((courses) => {
      console.warn(courses);
      this.setState({ loadingCourses: false, courses });
    });
  }

  onAddPress() {
    console.warn('onAddPress()');
    this.webView.injectJavaScript('$("input.wide")[0].value = "LALALA"; $("input.wide")[1].value = "LOLLOL"; $(".ico-blue").click();');
  }

  render() {
    return (
      // TODO: Put loading gif
      <View>
        {this.state.loadingCourses &&
          <Text>Loading courses...</Text>
        }

        <Button title="ADD!" onPress={this.onAddPress} />
        <WebView
          ref={(ref) => { this.webView = ref; }}
          source={{ uri: this.state.courseUrl }}
          userAgent="Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)"
        />

        {this.state.courses.map(course => (
        // TODO: Make a "Course" component to group all this
        // TODO: Use a google material cards view to show them
          <View key={course.id}>
            <Image style={styles.courseImage} source={{ uri: course.photo }} />
            <Image style={styles.courseImage} source={{ uri: course.photo_small }} />
            <Image style={styles.courseImage} source={{ uri: course.photo_large }} />
            <Text>ID: {course.id}</Text>
            <Text>Name: {course.name}</Text>
            <Text>Slug: {course.slug}</Text>
            <Text>URL: {course.url}</Text>
            <Text>Description: {course.description}</Text>
            <Text>Num Things: {course.num_things}</Text>
            <Text>Num Levels: {course.num_levels}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  courseImage: {
    width: 50,
    height: 50,
  },
});
