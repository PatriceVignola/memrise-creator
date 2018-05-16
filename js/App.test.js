/* @flow */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';

const renderer = new ShallowRenderer();

test('Matches snapshot', () => {
  const result = renderer.render(<App />);
  expect(result).toMatchSnapshot();
});
