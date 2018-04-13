/* @flow */

import React from 'react';
import { Button, View, WebView } from 'react-native';
import type { Course } from '../reducers/courses';

type Props = {
  course: Course,
};

class CourseScreen extends React.Component<Props> {
  webView: WebView;
  button: Button;
  view: View;

  constructor() {
    super();

    this.webView = null;
    this.onAddPress = this.onAddPress.bind(this);
  }

  onAddPress = () => {
    console.warn('onAddPress()');
    this.webView.injectJavaScript('$("input.wide")[0].value = "LALALA"; $("input.wide")[1].value = "LOLLOL"; $(".ico-blue").click();');
  }

  render() {
    const { course } = this.props;
    const uri = `memrise.com/course/${course.id}/${course.slug}/edit`;
    return (
      <View>
        <Button title="ADD!" onPress={this.onAddPress} />
        <WebView
          ref={(ref) => { this.webView = ref; }}
          source={{ uri }}
          userAgent="Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)"
        />
      </View>
    );
  }
}

export default CourseScreen;
