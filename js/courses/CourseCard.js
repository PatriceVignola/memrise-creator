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
import type { Course } from '../reducers/courses';

type Props = {
  course: Course,
};

function CourseCard(props: Props) {
  return (
    <Card>
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

export default CourseCard;
