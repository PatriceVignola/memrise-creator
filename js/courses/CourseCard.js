/* @flow */

import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Button,
} from 'react-native-paper';

import type { Course } from '../actions/types';

type Props = {
  course: Course,
  onPress: (course: Course) => void,
};

class CourseCard extends React.Component<Props> {
  onPress: () => void;

  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.course);
  }

  render() {
    return (
      <Card onPress={this.onPress}>
        <CardContent>
          <Title>{this.props.course.name}</Title>
        </CardContent>
        <CardCover source={{ uri: this.props.course.photoUrl }} />
        <CardActions>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </CardActions>
      </Card>
    );
  }
}

export default CourseCard;
