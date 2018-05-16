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

import { withHandlers } from 'recompose';

import type { Course } from '../actions/types';

type HigherOrderProps = {
  course: Course,
  onPress: (course: Course) => void,
};

type Props = {
  course: Course,
  onPress: () => void,
};

function CourseCard(props: Props) {
  return (
    <Card onPress={props.onPress}>
      <CardContent>
        <Title>{props.course.name}</Title>
      </CardContent>
      <CardCover source={{ uri: props.course.photoUrl }} />
      <CardActions>
        <Button>Cancel</Button>
        <Button>OK</Button>
      </CardActions>
    </Card>
  );
}

const enhance = withHandlers({
  onPress: (props: HigherOrderProps) => () => {
    props.onPress(props.course);
  },
});

export default enhance(CourseCard);
