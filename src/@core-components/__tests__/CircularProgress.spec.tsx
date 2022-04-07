// jest.useFakeTimers();

/**
 * @format
 */
import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CircularProgress from '../CircularProgress';

it('renders correctly', () => {
  renderer.create(<CircularProgress />);
});
