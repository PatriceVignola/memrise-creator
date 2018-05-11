/* @flow */

import React from 'react';
import { ListItem } from 'react-native-paper';
import Renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import ThingListItem from '../ThingListItem';

const shallowRenderer = new ShallowRenderer();

describe('ThingListItem', () => {
  const thingLanguage = {
    word: 'abc',
    kind: 'text',
    alts: ['def'],
  };

  const thing = {
    id: 1,
    source: thingLanguage,
    target: thingLanguage,
  };

  test('renders a thing', () => {
    const shallow = shallowRenderer.render((
      <ThingListItem
        onPress={jest.fn()}
        thing={thing}
      />
    ));

    expect(shallow).toMatchSnapshot();
  });

  test('passes the thing to its container when getting clicked', () => {
    const mockPressFunction = jest.fn();

    const deep = Renderer.create((
      <ThingListItem
        onPress={mockPressFunction}
        thing={thing}
      />
    ));

    deep.root.findByType(ListItem).props.onPress(thing);
    expect(mockPressFunction).toHaveBeenCalledTimes(1);
    expect(mockPressFunction).toHaveBeenCalledWith(thing);
  });
});
