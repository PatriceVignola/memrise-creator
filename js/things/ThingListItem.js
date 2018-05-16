/* @flow */

import React from 'react';
import { ListItem } from 'react-native-paper';
import { withHandlers } from 'recompose';

import type { Thing } from '../actions/types';

type HigherOrderProps = {
  onPress: (thing: Thing) => void,
  thing: Thing,
};

type Props = {
  onPress: () => void,
  thing: Thing,
};

function ThingListItem(props: Props) {
  // TODO: Add an icon or image, maybe the first google image of the combination of both words?
  return (
    <ListItem
      onPress={props.onPress}
      title={props.thing.target.word}
      description={props.thing.source.word}
    />
  );
}

const enhance = withHandlers({
  onPress: (props: HigherOrderProps) => () => {
    props.onPress(props.thing);
  },
});

export default enhance(ThingListItem);
