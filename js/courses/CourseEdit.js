/* @flow */

import React from 'react';
import { Button, FlatList, View, StyleSheet, Text, WebView } from 'react-native';
import { connect } from 'react-redux';
import { FAB } from 'react-native-paper';
import type { NavigationScreenProp, NavigationRoute } from 'react-navigation';

import ThingListItem from '../things/ThingListItem';
import { fetchThingsAsync } from '../actions/fetchApi';
import { getCoursesThings } from '../store/selectors';
import type { State } from '../store/selectors';
import type { Thing, CoursesThings, ThunkAction } from '../actions/types';

type Props = {
  coursesThings: CoursesThings,
  navigation: NavigationScreenProp<NavigationRoute>,
  fetchThings: (courseId: number) => ThunkAction,
};

// Name-export the unconnected component for tests
export class CourseEditScreen extends React.Component<Props> {
  webView: WebView;
  button: Button;
  view: View;
  handleAddPress: () => void;
  handleThingListItemPress: (thing: Thing) => void;

  constructor(props: Props) {
    super(props);

    const { params } = props.navigation.state;
    const course = params && params.course;

    if (course && course.id && typeof course.id === 'number') {
      props.fetchThings(course.id);
    }

    this.handleAddPress = this.handleAddPress.bind(this);
    this.handleThingListItemPress = this.handleThingListItemPress.bind(this);
  }

  handleAddPress() {
    this.webView.injectJavaScript('$("input.wide")[0].value = "LALALA"; $("input.wide")[1].value = "LOLLOL"; $(".ico-blue").click();');
  }

  // TODO: Should probably be handled by a subclass (see recomposer)
  handleThingListItemPress(thing: Thing) {
    this.props.navigation.navigate('ThingEdit', { thing });
  }

  render() {
    const { params } = this.props.navigation.state;
    const course = params && params.course;
    const courseId = course && typeof course.id === 'number' ? course.id : null;
    const courseSlug = course && typeof course.slug === 'string' ? course.slug : null;

    if (courseId && courseSlug && this.props.coursesThings[courseId]) {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.coursesThings[courseId]}
            renderItem={({ item }) => (
              <ThingListItem
                key={item.id}
                thing={item}
                onPress={this.handleThingListItemPress}
              />
            )}
            keyExtractor={item => item.toString()}
          />
          <FAB style={styles.FAB} icon="add" onPress={this.handleAddPress} />
          <WebView
            style={styles.webview}
            ref={(ref) => { this.webView = ref; }}
            source={{ uri: `https://memrise.com/course/${courseId}/${courseSlug}/edit` }}
            userAgent="Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)"
          />
        </View>
      );
    }

    // TODO: Put loading animation instead
    return (<Text>Loading...</Text>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FAB: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  webview: {
    display: 'none',
  },
});

export default connect((state: State) => ({
  coursesThings: getCoursesThings(state),
}), {
  fetchThings: fetchThingsAsync,
})(CourseEditScreen);
