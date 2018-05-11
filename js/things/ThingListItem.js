/* @flow */

import React from 'react';
import { ListItem } from 'react-native-paper';
import type { Thing } from '../actions/types';

type Props = {
  thing: Thing,
  onPress: (thing: Thing) => void,
};

class ThingListItem extends React.Component<Props> {
  onPress: (thing: Thing) => void;

  constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.thing);
  }

  render() {
    // TODO: Add an icon or image, maybe the first google image of the combination of both words?
    return (
      <ListItem
        onPress={this.onPress}
        title={this.props.thing.target.word}
        description={this.props.thing.source.word}
      />
    );
  }
}

export default ThingListItem;
